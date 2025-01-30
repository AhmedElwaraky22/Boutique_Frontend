import {RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllReviewsService } from './all-reviews.service';
import { AllReviewsComponent } from './all-reviews-list/all-reviews.component';
import { AuthGuard } from 'app/auth/helpers';
import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreSidebarModule } from '@core/components';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';
import { AvatarModule } from 'ngx-avatar';
import { FormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


const routes:Routes=[
  {
    path:'all-reviews',
    component:AllReviewsComponent,
    canActivate:[AuthGuard],
    
  }
]

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  declarations: [AllReviewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    NgbModule,
    NgxDatatableModule,
 
   
       
  ],
  providers:[AllReviewsService,{
  provide: SWIPER_CONFIG,
  useValue: DEFAULT_SWIPER_CONFIG
  }

   ]
})
export class AllReviewsModule { }
