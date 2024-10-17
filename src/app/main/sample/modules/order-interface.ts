export interface OrderInterface {
     shipment_id:     number;
     order_id:     number;
     products_count:     number;
     shipment_uid:    string;
     placed_on:       string;
     order_status:    string;
     store_image:    string;
     store_phone:    string;
     client_image:    string;
     client_name:     string;
     client_phone:     string;
     client_id:       number;
     store_name:      string;
     store_id:        number;
     deliver_address: DeliverAddress;
     payment_method:  PaymentMethod;
     products:        Product[];
     order_summary:   OrderSummary;
 }
 
 export interface DeliverAddress {
     id:               number;
     latitude:         string;
     longitude:        string;
     government:       string;
     city:             string;
     area:             string;
     street:           string;
     building_number:  string;
     apartment_number: string;
     phone:            string;
 }
 
 export interface OrderSummary {
     price_before_discount: number;
     delivery:              number;
     discount:              number;
     price_after_discount:  number;
     total:                 number;
 }
 
 export interface PaymentMethod {
     id:   number;
     name: string;
 }
 
 export interface Product {
     id:               number;
     product_id:       number;
     product_name:     string;
     product_price:    number;
     product_quantity: number;
     store_id:         number;
     store_name:       string;
     image:            Image[];
     feature_values:   FeatureValue[];
 }
 
 export interface FeatureValue {
     id:         number;
     value_id:   number;
     value_name: string;
 }
 
 export interface Image {
     id:    number;
     image: string;
 }
 