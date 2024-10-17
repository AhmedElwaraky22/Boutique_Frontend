
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagListComponent } from './tag-list/tag-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthGuard } from 'app/auth/helpers';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { AvatarModule } from 'ngx-avatar';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { TagServiceService } from './tag-service.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
 
  {
    path: 'view-all-tags',
    component:TagListComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:TagServiceService
    },
  }
]
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    TagListComponent
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
  , providers: [TagServiceService,  {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }]
})
export class TagModule { }
