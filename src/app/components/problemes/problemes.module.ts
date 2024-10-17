import { ProblemServiceService } from './problem-service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { AvatarModule } from 'ngx-avatar';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { AuthGuard } from 'app/auth/helpers';






const routes: Routes = [
 
  {
    path: 'view-all-problems',
    component:ProblemListComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:ProblemServiceService
    },
  }
]
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};






@NgModule({
  declarations: [
    ProblemListComponent
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
   
     BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
  ]
  , providers: [ProblemServiceService , {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }]
})
export class ProblemesModule { 



  
}
