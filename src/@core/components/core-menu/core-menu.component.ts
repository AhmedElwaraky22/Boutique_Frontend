import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreMenuService } from '@core/components/core-menu/core-menu.service';

@Component({
  selector: '[core-menu]',
  templateUrl: './core-menu.component.html',
  styleUrls: ['./core-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreMenuComponent implements OnInit {
  currentUser: any;
  public AllRestrictions:any

  @Input()
  layout = 'vertical';

  @Input()
  menu: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {ChangeDetectorRef} _changeDetectorRef
   * @param {CoreMenuService} _coreMenuService
   */
  constructor(private _changeDetectorRef: ChangeDetectorRef, private _coreMenuService: CoreMenuService) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    
    // Set the menu either from the input or from the service
    this.menu = this.menu || this._coreMenuService.getCurrentMenu();

    // Subscribe to the current menu changes
    this._coreMenuService.onMenuChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.currentUser = this._coreMenuService.currentUser;

      // Load menu
      this.menu = this._coreMenuService.getCurrentMenu();
      this._changeDetectorRef.markForCheck();
    });




     // Get and log user restrictions from localStorage
     const userRestrictions = JSON.parse(localStorage.getItem("restrictions")) || [];
    //  console.log('User Restrictions from localStorage:', userRestrictions);
     
     
     // Initialize array to store all menu restrictions
     let allMenuRestrictions = this.menu;
     const menuIds = allMenuRestrictions.map(item => item.id);
    //  console.log('restrictions in menu:', menuIds);
      
        // Filter out items from allMenuRestrictions that exist in userRestrictions
      this.AllRestrictions = allMenuRestrictions.filter(item => 
        userRestrictions.includes(item.id)
      );
      
      // console.log('this.AllRestrictions:', this.AllRestrictions);
  }



}
