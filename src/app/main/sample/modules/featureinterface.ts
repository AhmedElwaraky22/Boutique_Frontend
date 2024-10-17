export interface Featureinterface {
     feature_id:        number;
     feature_name_ar:      string;
     feature_name_en:      string;
    //  subCategory_id:    number;
    //  subCategory_title: string;
     category_id:       number;
     category_ar:     string;
     category_en:     string;
     category_image:    string;
     values:            Value[];
 }




//  Old interface 
// export interface Featureinterface {
//      feature_id:        number;
//      feature_name:      string;
//      subCategory_id:    number;
//      subCategory_title: string;
//      category_name:     string;
//      category_id:       number;
//      category_image:    string;
//      values:            Value[];
//  }

 
 
 export interface Value {
     id:    number;
     value: string;
 }
 