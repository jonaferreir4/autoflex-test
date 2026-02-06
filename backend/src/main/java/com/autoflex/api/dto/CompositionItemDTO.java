package com.autoflex.api.dto;

public record CompositionItemDTO(
        Long id,
        Long rawMaterialId,
        String rawMaterialName,
        String rawMaterialCode,
        Double quantityRequired
) {}