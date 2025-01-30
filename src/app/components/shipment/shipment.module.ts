import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentservService } from './shipmentserv.service';
import { AuthGuard } from 'app/auth/helpers';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentListComponent } from './shipment-list/shipment-list.component';
import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';
import { CoreCommonModule } from '@core/common.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'ngx-avatar';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CoreSidebarModule } from '@core/components';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ShipmentDetailsComponent } from './shipment-details/shipment-details.component';






const routes: Routes = [
  {
    path: 'view-all-shipments',
    component:ShipmentListComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:ShipmentservService
    },
  },
  {
    path: 'shipment-details/:id',
    component:ShipmentDetailsComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:ShipmentservService
    },
  },
]


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};



@NgModule({
  declarations: [ShipmentListComponent, ShipmentDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    
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
  , providers: [ShipmentservService,  {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }]
})
export class ShipmentModule { }
