
export interface UserData {
    id:              number;
    full_name:       string;
    email:           string;
    phone:           string;
    image:           null;
    mobile_verified: boolean;
    banned:          boolean;
    isDeleted:       boolean;
    created_at:      string;
    updated_at:      string;
    address:         Address[];
}

export interface Address {
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
