import { OrderListComponent } from './order-list/order-list.component';
import { OrderservService } from './orderserv.service';
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
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { PreviousShipmentComponent } from './previous-shipment/previous-shipment.component';



const routes: Routes = [
  {
    path: 'view-all-orders',
    component:OrderListComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:OrderservService
    },
  },
  {
    path: 'view-orders-status',
    component:OrderStatusComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:OrderservService
    },
  },
  {
    path: 'order-details/:id',
    component:OrderDetailsComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:OrderservService
    },
  },
  {
    path: 'pervious-shipment',
    component:PreviousShipmentComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:OrderservService
    },
  }
]

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent,
    OrderStatusComponent,
    PreviousShipmentComponent,
  ],
  imports: [
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
  , providers: [OrderservService,  {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }]

})
export class OrderModule { }
