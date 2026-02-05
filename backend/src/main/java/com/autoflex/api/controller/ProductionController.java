package com.autoflex.api.controller;

import com.autoflex.api.dto.ProductionSuggestionDTO;
import com.autoflex.api.service.OptimizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/production")
public class ProductionController {

    private final OptimizationService service;

    public ProductionController(OptimizationService service) {
        this.service = service;
    }

    @GetMapping("/suggestion")
    public ResponseEntity<List<ProductionSuggestionDTO>> getSuggestion() {
        return ResponseEntity.ok(service.calculateMaxProduction());
    }
}