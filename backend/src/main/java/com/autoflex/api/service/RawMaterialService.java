package com.autoflex.api.service;

import com.autoflex.api.dto.RawMaterialDTO;
import com.autoflex.api.entity.RawMaterial;
import com.autoflex.api.exception.ResourceNotFoundException;
import com.autoflex.api.repository.RawMaterialRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RawMaterialService {

    private final RawMaterialRepository repository;

    public RawMaterialService(RawMaterialRepository repository) {
        this.repository = repository;
    }

    public List<RawMaterialDTO> findAll() {
        return repository.findAll().stream()
                .map(m -> new RawMaterialDTO(m.getId(), m.getName(), m.getStockQuantity()))
                .toList();
    }

    @Transactional
    public RawMaterialDTO save(RawMaterialDTO dto) {
        RawMaterial entity = new RawMaterial();
        entity.setName(dto.name());
        entity.setStockQuantity(dto.stockQuantity());

        RawMaterial saved = repository.save(entity);
        return new RawMaterialDTO(saved.getId(), saved.getName(), saved.getStockQuantity());
    }

    @Transactional
    public RawMaterialDTO update(Long id, RawMaterialDTO dto) {
        RawMaterial entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found with ID: " + id));

        entity.setName(dto.name());
        entity.setStockQuantity(dto.stockQuantity());
        RawMaterial updated = repository.save(entity);

        return new RawMaterialDTO(updated.getId(), updated.getName(), updated.getStockQuantity());
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Material not found with ID: " + id);
        }

        repository.deleteById(id);
    }
}