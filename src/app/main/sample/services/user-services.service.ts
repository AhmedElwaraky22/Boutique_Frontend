import { UserData } from './../modules/user-data';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private HttpC:HttpClient) { }

  GetAlluser(page){
    return this.HttpC.get<UserData>(`${environment.apiUrl}admin/all-user?page=${page}`);
  }


}
