import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Use BehaviorSubject to store the current ID value
  private idSource = new BehaviorSubject<number | null>(null);

  // Observable for other components to subscribe to
  currentId$ = this.idSource.asObservable();

  constructor() {}

  // Method to change the ID
  changeId(id: number) {
    this.idSource.next(id);
  }

  // Method to get restrictions from localStorage
  getRestrictions(): any | null {
    const restrictions = localStorage.getItem('restrictions');
    console.log(restrictions);
    return restrictions;
  }

  // Method to get the role from localStorage
  getRole(): any | null {
    const userRole = localStorage.getItem('role');
    console.log(userRole);
    return userRole;
  }
}
