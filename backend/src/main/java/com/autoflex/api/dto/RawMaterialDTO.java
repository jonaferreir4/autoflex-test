package com.autoflex.api.dto;

public record RawMaterialDTO(
        Long id,
        String name,
        Integer stockQuantity
) {}