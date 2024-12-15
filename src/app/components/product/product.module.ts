import { ProductsService } from './products.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
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
import { EcommerceItemComponent } from './ecommerce-item/ecommerce-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { CreateProductComponent } from './create-product/create-product.component';
import { TempProductComponent } from './product-temp/temp-product.component';



const routes: Routes = [
  {
    path: 'view-temp-products',
    component:TempProductComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:ProductsService
    },
  },

  {
    path: 'view-all-products',
    component:ProductListComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:ProductsService
    },
  },
  
  {
    path: 'product-details/:id',
    component:ProductDetailComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:ProductsService
    },
  },

  {
    path: 'create-product',
    component:CreateProductComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls:ProductsService
    },
  }
]

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    EcommerceItemComponent,
    CreateProductComponent,
    TempProductComponent
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
  , providers: [ProductsService,  {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }]

})
export class ProductModule { }
 