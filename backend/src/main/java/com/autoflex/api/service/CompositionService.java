package com.autoflex.api.service;

import com.autoflex.api.dto.CompositionRequestDTO;
import com.autoflex.api.entity.Product;
import com.autoflex.api.entity.ProductComposition;
import com.autoflex.api.entity.RawMaterial;
import com.autoflex.api.exception.ResourceNotFoundException;
import com.autoflex.api.repository.ProductCompositionRepository;
import com.autoflex.api.repository.ProductRepository;
import com.autoflex.api.repository.RawMaterialRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CompositionService {

    private final ProductCompositionRepository compositionRepository;
    private final ProductRepository productRepository;
    private final RawMaterialRepository materialRepository;

    public CompositionService(ProductCompositionRepository compositionRepository,
                              ProductRepository productRepository,
                              RawMaterialRepository materialRepository) {
        this.compositionRepository = compositionRepository;
        this.productRepository = productRepository;
        this.materialRepository = materialRepository;
    }

    @Transactional
    public void addMaterialToProduct(CompositionRequestDTO dto) {
        Product product = productRepository.findById(dto.productId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + dto.productId()));

        RawMaterial material = materialRepository.findById(dto.rawMaterialId())
                .orElseThrow(() -> new ResourceNotFoundException("Materia not found with ID: " + dto.rawMaterialId()));

        ProductComposition composition = new ProductComposition();
        composition.setProduct(product);
        composition.setRawMaterial(material);
        composition.setQuantityRequired(dto.quantityRequired());

        compositionRepository.save(composition);
    }
}