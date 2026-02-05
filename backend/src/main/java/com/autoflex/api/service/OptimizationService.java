package com.autoflex.api.service;

import com.autoflex.api.dto.ProductionSuggestionDTO;
import com.autoflex.api.entity.Product;
import com.autoflex.api.entity.ProductComposition;
import com.autoflex.api.entity.RawMaterial;
import com.autoflex.api.repository.ProductCompositionRepository;
import com.autoflex.api.repository.ProductRepository;
import com.autoflex.api.repository.RawMaterialRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OptimizationService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;
    private final ProductCompositionRepository compositionRepository;

    public OptimizationService(ProductRepository productRepository,
                               RawMaterialRepository rawMaterialRepository,
                               ProductCompositionRepository compositionRepository) {
        this.productRepository = productRepository;
        this.rawMaterialRepository = rawMaterialRepository;
        this.compositionRepository = compositionRepository;
    }

    @Transactional(readOnly = true)
    public List<ProductionSuggestionDTO> calculateMaxProduction() {
        List<Product> products = productRepository.findAllByOrderByValueDesc();

        Map<Long, Double> tempStock = rawMaterialRepository.findAll().stream()
                .collect(Collectors.toMap(RawMaterial::getId, rm -> (double) rm.getStockQuantity()));

        List<ProductComposition> allCompositions = compositionRepository.findAll();

        List<ProductionSuggestionDTO> suggestions = new ArrayList<>();

        for (Product product : products) {
            List<ProductComposition> recipe = allCompositions.stream()
                    .filter(c -> c.getProduct().getId().equals(product.getId()))
                    .toList();

            if (recipe.isEmpty()) continue;

            int maxPossibleUnits = Integer.MAX_VALUE;

            for (ProductComposition item : recipe) {
                Long materialId = item.getRawMaterial().getId();
                double currentStock = tempStock.getOrDefault(materialId, 0.0);
                double required = item.getQuantityRequired();

                if (required > 0) {
                    int possible = (int) (currentStock / required);
                    maxPossibleUnits = Math.min(maxPossibleUnits, possible);
                }
            }

            if (maxPossibleUnits > 0) {
                BigDecimal totalValue = product.getValue().multiply(BigDecimal.valueOf(maxPossibleUnits));

                suggestions.add(new ProductionSuggestionDTO(
                        product.getName(),
                        maxPossibleUnits,
                        totalValue
                ));

                for (ProductComposition item : recipe) {
                    Long materialId = item.getRawMaterial().getId();
                    double used = item.getQuantityRequired() * maxPossibleUnits;
                    tempStock.put(materialId, tempStock.get(materialId) - used);
                }
            }
        }

        return suggestions;
    }
}