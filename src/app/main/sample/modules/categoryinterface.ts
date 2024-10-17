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
 
 export interface Subcategory {
    id: number;
    name_en: string;
    name_ar: string;
    category_id: number;
    category_name_ar: string;
    category_name_en: string;
    category_image: string | null;
    features: any[]; 
    created_at: string; 
    updated_at: string; 
 }
