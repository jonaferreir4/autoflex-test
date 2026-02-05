package com.autoflex.api.service;

import com.autoflex.api.dto.RawMaterialDTO;
import com.autoflex.api.entity.RawMaterial;
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
}