package com.autoflex.api.dto;

public record CompositionRequestDTO(
        Long productId,
        Long rawMaterialId,
        Double quantityRequired
) {}