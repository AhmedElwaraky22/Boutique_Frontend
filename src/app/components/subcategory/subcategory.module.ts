import { SubcategoryListComponent } from './subcategory-list/subcategory-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'app/auth/helpers';
import { RouterModule, Routes } from '@angular/router';
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
import { SubcategoryserviceService } from './subcategoryservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";

const routes: Routes = [
 
  {
    path: 'view-all-subcategory',
    component:SubcategoryListComponent,
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
  declarations: [
    SubcategoryListComponent,
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
  , providers: [SubcategoryserviceService,  {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }]

})

export class SubcategoryModule { }
