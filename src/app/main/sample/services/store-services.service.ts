import { StoreProfile } from './../modules/store-profile';
import { DeletedStore } from './../modules/deleted-store';
import { map } from 'rxjs/operators';
import { StoreInterface } from './../modules/store-interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreServicesService {

  constructor(private HttpC:HttpClient) {}

  GetAllStore(page){
    return this.HttpC.get<StoreInterface>(`${environment.apiUrl}admin/viewallstores?page=${page}`).pipe(map(res => res['0']));
  }
  Getnewstorerequest(page){
    return this.HttpC.get<StoreInterface>(`${environment.apiUrl}admin/viewstorereq?page=${page}`).pipe(map(res => res['0']));
    // return this.HttpC.get<StoreInterface>(`${environment.apiUrl}admin/viewallstores`);
  }
  Store_Request_Accept($id:number){
    return this.HttpC.post<any>(`${environment.apiUrl}admin/accstorereq`,{
      "id":$id
  });
  }
  delete_store($id:number){
    return this.HttpC.post<any>(`${environment.apiUrl}admin/delete-store`,{
      "id":$id
  });
  }
  restore_store($id:number){
    return this.HttpC.post<any>(`${environment.apiUrl}admin/restore-store`,{
      "id":$id
  });
  }
  viewalldeletedstore(){
    return this.HttpC.get<DeletedStore>(`${environment.apiUrl}admin/view-deleted-store`).pipe(map(res => res['data']));
  }
  viewallbannedstore(){
    return this.HttpC.get<DeletedStore>(`${environment.apiUrl}admin/view-banned-store`).pipe(map(res => res['data']));
    // return this.HttpC.get<StoreInterface>(`${environment.apiUrl}admin/viewallstores`);
  }


  banned_store($id:number){
    return this.HttpC.post<any>(`${environment.apiUrl}admin/banned-store`,{
      "id":$id
  });
  }
  unbanned_store($id:number){
    return this.HttpC.post<any>(`${environment.apiUrl}admin/unbanned-store`,{
      "id":$id
  });
  }
  store_profile($id:number){
    return this.HttpC.post<StoreProfile>(`${environment.apiUrl}admin/get-store-data-by-id`,{
      "id":$id
    }).pipe(map(res => res['data']));
  }

search($text:any){
  return this.HttpC.post<any>(`${environment.apiUrl}admin/search`,{
    "text":$text
}).pipe(map(res => res['0'])) ;
}
}
