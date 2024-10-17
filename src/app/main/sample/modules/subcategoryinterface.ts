// Old interFace
// export interface Subcategoryinterface {
//   id: number;
//   category_id: number;
//   title: string;
//   category_name: string;
//   category_image: string;
//   features: Feature[];
// }


// New interFace
// export interface Subcategoryinterface {
//   id: number;
//   name_en: string;
//   name_ar: string;
//   category_id: number;
//   category_name_ar: string;
//   category_name_en: string;
//   category_image: string | null;
//   features: any[]; 
//   created_at: string; 
//   updated_at: string; 
// }



export interface Subcategoryinterface {
  id: number;
  name_en: string;
  name_ar: string;
  image: string;
  subcategories: any[];
}






export interface Feature {
  id: number;
  name: string;
  values: Value[];
}

export interface Value {
  id: number;
  value: string;
}
