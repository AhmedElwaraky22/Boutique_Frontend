import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CoreCommonModule } from "@core/common.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from "@angular/platform-browser";

import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import {NgbPaginationModule,NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import { NgApexchartsModule } from "ng-apexcharts";


import { AuthGuard } from "app/auth/helpers";

import { CreatePipe } from "./pipes/create.pipe";

import { AvatarModule } from "ngx-avatar";
import { StoreProfileComponent } from "./Store/store-profile/store-profile.component";
import { HomeComponent } from "./home.component";
import { TruncateWordsPipe } from './pipes/truncate-words.pipe';

// ///////////////////////Main Routes ///////////////
const routes = [
  {
    path: "home",
    component: HomeComponent,
    data: { animation: "home" },
    canActivate: [AuthGuard],
  },
  {
    path: "store-profile/:id",
    component: StoreProfileComponent,
    data: { animation: "home" },
    canActivate: [AuthGuard],
  },
  {
    path: "store",
    loadChildren: () =>
      import("../../components/store/store.module").then((m) => m.StoreModule),
  },
  {
    path: "user",
    loadChildren: () =>
      import("../../components/user/user.module").then((m) => m.UserModule),
  },
  {
    path: "product",
    loadChildren: () =>
      import("../../components/product/product.module").then(
        (m) => m.ProductModule
      ),
  },
  {
    path: "order",
    loadChildren: () =>
      import("../../components/order/order.module").then((m) => m.OrderModule),
  },
  {
    path: 'tag',
    loadChildren: () => import('../../components/tag/tag.module').then(m => m.TagModule)
  }, {
    path: 'problems',
    loadChildren: () =>  import('../../components/problemes/problemes.module').then(m => m.ProblemesModule)
  },
];

@NgModule({
  declarations: [HomeComponent, CreatePipe, StoreProfileComponent, TruncateWordsPipe],
  imports: [
    RouterModule.forChild(routes),
    NgbPaginationModule,
    NgbAlertModule,
    NgApexchartsModule,
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    AvatarModule,
    FormsModule,
    NgbModule,
    BrowserModule,
  ],
  exports: [HomeComponent] 
})
export class SampleModule {}
