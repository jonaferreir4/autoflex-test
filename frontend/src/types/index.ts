export interface Product {
  id: number;
  name: string;
  value: number;
}

export interface RawMaterial {
  id: number;
  name: string;
  stockQuantity: number;
}

export interface ProductionSuggestion {
  productName: string;
  quantity: number;
  totalValue: number;
}

export interface CompositionRequest {
  productId: number;
  rawMaterialId: number;
  quantityRequired: number;
}