
 export interface StoreInterface {
    id:            number;
    store_name:    string;
    owner_name:    null;
    store_slug:    string;
    email:         string;
    mobile_verified:      boolean;
    verified:      boolean;
    banned:        boolean;
    isDeleted:        boolean;
    store_address: StoreAddress;
    store_phone:   string;
    store_url:     string;
    about_store:   null;
    profile_image: null;
    banner:        null;
    categories:    Category[];
}   

export interface Category {
    id:            number;
    name:          string;
    image:         string;
    subcategories: Subcategory[];
}

export interface Subcategory {
    id:          number;
    title:       string;
    category_id: number;
    created_at:  Date;
    updated_at:  Date;
}

export interface StoreAddress {
    address:   string;
    latitude:  null;
    longitude: null;
}
