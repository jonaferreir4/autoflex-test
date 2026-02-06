package com.autoflex.api.dto;

public record RawMaterialDTO(
        Long id,
        String code,
        String name,
        Integer stockQuantity
) {}