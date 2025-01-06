export interface TempProduct {
    product_id: number;
    product_name: string;
    category_name: string;
    product_price: number;
    rejection_reason: string;
    status: string;
    has_discount: boolean;
    discounted_price: number;
    product_image: string;
  }
  
  export interface TempProductResponse {
    data: TempProduct[];
  }