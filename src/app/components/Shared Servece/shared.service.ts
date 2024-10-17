// shared.service.ts
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

  // Method to change the ID
  changeId(id: number) {
    this.idSource.next(id);
  }
}
