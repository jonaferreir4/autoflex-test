package com.autoflex.api.service;

import com.autoflex.api.dto.ProductDTO;
import com.autoflex.api.entity.Product;
import com.autoflex.api.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<ProductDTO> findAll() {
        return repository.findAll().stream()
                .map(p -> new ProductDTO(p.getId(), p.getName(), p.getValue()))
                .toList();
    }

    @Transactional
    public ProductDTO save(ProductDTO dto) {
        Product entity = new Product();
        entity.setName(dto.name());
        entity.setValue(dto.value());

        Product saved = repository.save(entity);
        return new ProductDTO(saved.getId(), saved.getName(), saved.getValue());
    }
}