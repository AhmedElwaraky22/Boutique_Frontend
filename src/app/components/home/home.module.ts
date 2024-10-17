import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNewComponent } from './home-list/home-new.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AuthGuard } from 'app/auth/helpers';
import { HomeService } from 'app/components/home/home.service';

import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { AvatarModule } from 'ngx-avatar';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const routes = [
  {
    path: "home",
    component: HomeNewComponent,
    data: { animation: "home" },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [HomeNewComponent],
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
    CommonModule,
    NgApexchartsModule,
  ]
  , providers: [HomeService]
})
export class HomeModule { }
