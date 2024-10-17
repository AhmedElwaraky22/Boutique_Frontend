export interface FeatureValue {
    id: number;
    value_ar: string | null;
    value_en: string;
  }
  
  export interface Feature {
    id: number;
    name: string;
    values: FeatureValue[];
  }
  
  export interface SubDetailsinterface {
    id: number;
    name_en: string;
    name_ar: string;
    category_id: number;
    category_name_ar: string;
    category_name_en: string;
    category_image: string | null;
    features: Feature[];
    created_at: string;
    updated_at: string;
  }