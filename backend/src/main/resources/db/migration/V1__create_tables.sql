CREATE TABLE products (
                          id BIGSERIAL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          value DECIMAL(10, 2) NOT NULL
);

CREATE TABLE raw_materials (
                               id BIGSERIAL PRIMARY KEY,
                               name VARCHAR(255) NOT NULL,
                               stock_quantity INTEGER NOT NULL
);

CREATE TABLE product_compositions (
                                      id BIGSERIAL PRIMARY KEY,
                                      product_id BIGINT NOT NULL,
                                      raw_material_id BIGINT NOT NULL,
                                      quantity_required DOUBLE PRECISION NOT NULL,
                                      CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id),
                                      CONSTRAINT fk_raw_material FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id)
);