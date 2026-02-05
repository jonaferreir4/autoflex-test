package com.autoflex.api.controller;

import com.autoflex.api.dto.CompositionRequestDTO;
import com.autoflex.api.dto.ProductDTO;
import com.autoflex.api.service.CompositionService;
import com.autoflex.api.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final CompositionService compositionService;

    public ProductController(ProductService productService, CompositionService compositionService) {
        this.productService = productService;
        this.compositionService = compositionService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> listAll() {
        return ResponseEntity.ok(productService.findAll());
    }

    @PostMapping
    public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO dto) {
        ProductDTO saved = productService.save(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.id())
                .toUri();
        return ResponseEntity.created(uri).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> update(@PathVariable Long id, @RequestBody ProductDTO dto) {
        return ResponseEntity.ok(productService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/composition")
    public ResponseEntity<Void> addComposition(@PathVariable Long id, @RequestBody CompositionRequestDTO dto) {
        if (!id.equals(dto.productId())) {
            throw new IllegalArgumentException("The URL ID differs from the request body");
        }
        compositionService.addMaterialToProduct(dto);
        return ResponseEntity.noContent().build();
    }
}