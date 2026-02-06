export interface Product {
  id: number;
  code: string;
  name: string;
  value: number;
}

export interface RawMaterial {
  id: number;
  code: string;
  name: string;
  stockQuantity: number;
}

export interface ProductionSuggestion {
  productCode?: string;
  productName: string;
  quantity: number;
  totalValue: number;
}

export interface CompositionRequest {
  productId: number;
  rawMaterialId: number;
  quantityRequired: number;
}

export interface CompositionItem {
  id: number;
  rawMaterialId: number;
  rawMaterialName: string;
  rawMaterialCode: string;
  quantityRequired: number;
}