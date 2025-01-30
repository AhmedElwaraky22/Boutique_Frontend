import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SharedService {
  
  private idSource = new BehaviorSubject<number | null>(null);
  public currentId$ = this.idSource.asObservable();
  private userRole: string | null = null;


  constructor()
  {
    this.userRole = localStorage.getItem('role')
  }


  changeId(id: number) {
    this.idSource.next(id);
  }

  getRole(): string | null {
    return this.userRole;
  }

  // Setter for userRole (optional, if you need to update it)
  setRole(role: string): void {
    this.userRole = role;
    localStorage.setItem('role', role);
  }

}
