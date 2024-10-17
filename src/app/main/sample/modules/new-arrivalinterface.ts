export interface Product {
  product_id: number;
  product_name: string;
  category_name: string;
  is_Favorite: boolean;
  rate: number | null;
  product_price: number;
  store: string;
  has_discount: boolean;
  discounted_price: number;
  discount_percentage: number | null;
  product_image: string;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface ProductResponse {
  data: Product[];
  pagination: Pagination;
}