import { JwtInterceptor } from './auth/helpers/jwt.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AvatarModule } from 'ngx-avatar';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast
import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';
import { coreConfig } from 'app/app-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from './components/user/user.module';
import { StoreModule } from './components/store/store.module';
import { ProductModule } from './components/product/product.module';
import { OrderModule } from './components/order/order.module';
import { CategoryModule } from './components/category/category.module';
import { SubcategoryModule } from './components/subcategory/subcategory.module';
import { TagModule } from './components/tag/tag.module';
import { FeatureModule } from './components/feature/feature.module';
import { ProblemesModule } from './components/problemes/problemes.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HomeModule } from './components/home/home.module';
import { SubDetailsModule } from './components/subcategoryDetails/sub-details.module';
import { ModelDetailsModule } from './components/model-details/model-details.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeProductsModule } from './components/Home Products/home-products.module';
import { StatusModule } from './components/status-manager/status.module';








const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AvatarModule,
    NgbPaginationModule,
    NgApexchartsModule,
    NgbAlertModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    HomeModule,
    // SampleModule,
    UserModule,
    StoreModule,
    ProductModule,
    OrderModule,
    CategoryModule,
    SubcategoryModule,
    TagModule,
    FeatureModule,
    ProblemesModule,
    SubDetailsModule,
    ModelDetailsModule,
    HomeProductsModule,
    StatusModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}