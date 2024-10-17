export interface StoreProfile {

     id:            number;
     store_name:    string;
     store_slug:    string;
     store_address: StoreAddress;
     store_phone:   string;
     owner_name:   string;
     categories:    CategoryElement[];
     store_url:     string;
     email:     string;
     about_store?:   string;
     profile_image?: string;
     banner?:        string;
     products:      Product[];
 }
 
 export interface CategoryElement {
     id:            number;
     title:         string;
     image:         string;
     subcategories: Subcategory[];
 }
 
 export interface Subcategory {
     id:          number;
     title:       string;
     category_id: number;
     created_at:  string;
     updated_at:  string;
 }
 
 export interface Product {
     id:                          number;
     name:                        string;
     store:                       StoreClass;
     category:                    StoreClass;
     rate?:                        string;
     subcategory:                 StoreClass;
     price:                       number;
     quantity:                    number;
     has_discount:                boolean;
     discounted_price:            number;
     discount_percentage:         number;
     image:                       Image[];
     overview:                    string;
     tags:                        StoreClass[];
     features:                    Feature[];
     product_additional_features: ProductAdditionalFeature[];
 }
 
 export interface StoreClass {
     id:   number;
     name: string;
 }
 
 export interface Feature {
     id:     number;
     name:   string;
     values: Value[];
 }
 
 export interface Value {
     id:    number;
     value: string;
 }
 
 export interface Image {
     id:    number;
     image: string;
 }
 
 export interface ProductAdditionalFeature {
     id:         number;
     product_id: number;
     name:       string;
     value:      string;
     created_at: Date;
     updated_at: Date;
 }
 
 export interface StoreAddress {
     address:   string;
     latitude?:  string;
     longitude?: string;
 }
 