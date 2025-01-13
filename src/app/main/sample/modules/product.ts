export interface Categoryinterface {
  id:            number;
  name_en:          string;
  name_ar:          string;
 //  image:         string;
 //  subcategories: Subcategory[];
}

//  export interface Subcategory {
//      id:          number;
//      title:       string;
//      category_id: string;
//      created_at:  Date;
//      updated_at:  Date;
//  }


export interface Subcategoryinterface {
  id: number;
  name_en: string;
  name_ar: string;
  image: string;
  subcategories: any[];
}
export interface Product {
     product_id:                  number;
     product_name:                string;
     category_name:               string;
     rate:                        number;
     total_reviews:               number;
     subcategory:                 Category;
     product_price:               number;
     product_quantity:            number;
     has_discount:                boolean;
     discounted_price:            number;
     discount_percentage:         number;
     product_image:                string;
     overview:                    string;
     tags:                        Category[];
     features:                    Features[];
     product_additional_features: ProductAdditionalFeature[];
 }
 
 export interface ProductDetails {
  product_id: number;
  name_en: string;
  name_ar: string;
  store: Store;
  category: Category;
  rate: number | null;
  total_reviews: number;
  subcategory: string | null;
  product_price: number;
  has_discount: boolean;
  discounted_price: number;
  discount_percentage: number;
  images: string[];
  images_ids: number[];
  description_en: string;
  description_ar: string;
  tags: string[];
  product_skus: ProductSku[];
  product_additional_features: {
      id: number;
      name: string;
      name_ar: string;
      name_en: string;
      value: string;
      value_en: string;
      value_ar: string;
  }[];
}


export interface Store {
    id: number;
    name: string;
    image?: string;
    address: string;
    rate: number | null;
    total_reviews: number;
  }

 export interface Category {
     id:   number;
     name: string;
 }
 export interface Subcategory {
    id: number;
    name: string;
  }
  

  export interface Features {
    name: string;
    id: number;
    is_color: boolean;
    main_feature_values: MainFeatureValue[];
  }

  export interface MainFeatureValue {
    name: string;
    id: number;
    has_quantity: boolean;
    sku_ids: number[];
    second_feature: SecondFeature;
  }
  export interface SecondFeature {
    name: string;
    id: number;
    is_color: boolean;
    second_feature_values: SecondFeatureValue[];
  }
  export interface SecondFeatureValue {
    name: string;
    price: number;
    quantity: string;
    sku_id: number;
    id: number;
  }
 export interface ValueElement {
     id:    number;
     value: string;
 }
 export interface AdditionalFeature {
    id: number;
    name: string;
    name_ar: string;
    name_en: string;
    value: string;
    value_en: string;
    value_ar: string;
  }

 
 export interface Image {
     id:    number;
     product_id: number;
     image: string;
 }
 
 export interface ProductAdditionalFeature {
     id:    number;
     name:  string;
     name_ar:  string;
     name_en:  string;
     value: string;
     value_en: string;
     value_ar: string;
 }
 interface FeatureValue {
  id: number;
  value_en: string | null;
  value_ar: string | null;
  value: string;
  feature: string;
  feature_id: string;
}

export interface ProductSku {
  id: number;
  sku: string;
  product_id: string;
  price: number;
  quantity: string;
  feature_values: any[]; // Adjust `any[]` based on the expected data type for feature_values
}

export interface AllStores {
  id: number;
  store_name: string;
  owner_name: string | null;
  store_slug: string;
  email: string;
  mobile_verified: boolean;
  verified: boolean;
  banned: boolean;
  isDeleted: boolean;
}




 