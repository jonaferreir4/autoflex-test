package com.autoflex.api.service;

import com.autoflex.api.dto.ProductDTO;
import com.autoflex.api.entity.Product;
import com.autoflex.api.exception.ResourceNotFoundException;
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
                .map(p -> new ProductDTO(p.getId(), p.getCode(), p.getName(), p.getValue()))
                .toList();
    }

    @Transactional
    public ProductDTO save(ProductDTO dto) {
        Product entity = new Product();
        entity.setCode(dto.code());
        entity.setName(dto.name());
        entity.setValue(dto.value());

        Product saved = repository.save(entity);
        return new ProductDTO(saved.getId(), saved.getCode(), saved.getName(), saved.getValue());
    }

    @Transactional
    public ProductDTO update(Long id, ProductDTO dto) {
        Product entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));

        entity.setCode(dto.code());
        entity.setName(dto.name());
        entity.setValue(dto.value());

        Product saved = repository.save(entity);
        return new ProductDTO(saved.getId(), saved.getCode(), saved.getName(), saved.getValue());
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with ID: " + id);
        }
        repository.deleteById(id);
    }
}