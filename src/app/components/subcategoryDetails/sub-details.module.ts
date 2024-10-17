import { SubDetailsListComponent } from './sub-details-list/sub-details-list.component';
// import { SubDetailsServiceService } from './sub-details-service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'app/auth/helpers';
import { Routes ,RouterModule} from '@angular/router';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { SubcategoryserviceService } from '../subcategory/subcategoryservice.service';




const routes: Routes = [
 
  {
    path: 'view-Second-Sub',
    component:SubDetailsListComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:SubcategoryserviceService
    },
    data: { animation: 'repeater' }

  }

]

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};



@NgModule({
  declarations: [SubDetailsListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
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
  ], 
    providers: [ SubcategoryserviceService,{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }]
})

export class SubDetailsModule { }
