import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'app/auth/helpers';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CoreCommonModule } from '@core/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { TransactionsService } from './status.service';
import { PendingListComponent } from './pending-list/pending-list.component';
import { AcceptListComponent } from './accept-list/accept-list.component';
import { RejectListComponent } from './reject-list/reject-list.component';
// import { StatusManagerComponent } from './status-manager.component';
// 





const routes: Routes = [
  {
    path: 'view-pending',
    component:PendingListComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:TransactionsService
    },
  }, 
  {
    path: 'view-accepted',
    component:AcceptListComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:TransactionsService
    },
  },
  {
    path: 'view-rejected',
    component:RejectListComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:TransactionsService
    },
  },
]

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  declarations: [
    // StatusManagerComponent,
 
  
    PendingListComponent,
    AcceptListComponent,
    RejectListComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule,
    CoreCommonModule,
    SwiperModule,
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
  , providers: [TransactionsService,  {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }]

})

export class StatusModule { }
