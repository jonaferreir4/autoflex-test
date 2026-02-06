package com.autoflex.api.repository;

import com.autoflex.api.entity.ProductComposition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductCompositionRepository extends JpaRepository<ProductComposition, Long> {
    List<ProductComposition> findByProductId(Long productId);
    Optional<ProductComposition> findByProductIdAndRawMaterialId(Long productId, Long rawMaterialId);
    void deleteByProductId(Long productId);
}