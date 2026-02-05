package com.autoflex.api.dto;

import java.math.BigDecimal;

public record ProductionSuggestionDTO(
        String productName,
        Integer quantity,
        BigDecimal totalValue
) {}