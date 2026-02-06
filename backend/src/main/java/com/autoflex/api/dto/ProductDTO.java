package com.autoflex.api.dto;

import java.math.BigDecimal;

public record ProductDTO(
        Long id,
        String code,
        String name,
        BigDecimal value
) {}