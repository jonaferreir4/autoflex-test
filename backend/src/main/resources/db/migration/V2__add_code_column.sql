ALTER TABLE products ADD COLUMN code VARCHAR(50);

UPDATE products SET code = 'PROD-' || id WHERE code IS NULL;

ALTER TABLE products ALTER COLUMN code SET NOT NULL;
ALTER TABLE products ADD CONSTRAINT uk_product_code UNIQUE (code);

ALTER TABLE raw_materials ADD COLUMN code VARCHAR(50);

UPDATE raw_materials SET code = 'MAT-' || id WHERE code IS NULL;

ALTER TABLE raw_materials ALTER COLUMN code SET NOT NULL;
ALTER TABLE raw_materials ADD CONSTRAINT uk_material_code UNIQUE (code);