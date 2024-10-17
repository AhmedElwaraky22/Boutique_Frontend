
export interface DeletedStore {
     data: Datum[];
     code: number;
 }
 
 export interface Datum {
     id:                number;
     owner_name:        null;
     email:             string;
     email_verified_at: null;
     phone:             string;
     banned:            string;
     verified:          string;
     mobile_verified:   string;
     store_name:        string;
     url:               string;
     slug:              string;
     address:           string;
     lat:               null;
     lin:               null;
     about:             null;
     banner:            null;
     profile_img:       null;
     created_at:        string;
     updated_at:        string;
     deleted_at:        string;
 }
 