import { StoreSService } from './store-s.service';
import { AuthGuard } from 'app/auth/helpers';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NewStoreRequestComponent } from './new-store-request/new-store-request.component';
import { AllStoresComponent } from './all-stores/all-stores.component';

const routes: Routes = [
 
  {
    path: 'new-stores-request',
    component:NewStoreRequestComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:StoreSService
    },
  }
  ,
  {
    path: 'view-all-stores',
    component:AllStoresComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:StoreSService
    },
  }
  
 
];
@NgModule({
  declarations: [
    NewStoreRequestComponent,
    AllStoresComponent

  ],
  imports: [
    RouterModule.forChild(routes),
    NgIf,
    CommonModule,
    CoreCommonModule,
    FormsModule,
    NgbModule,
    AvatarModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    SweetAlert2Module.forRoot(),
  ]
  , providers: [StoreSService]

})
export class StoreModule { }
