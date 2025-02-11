import { UsersService } from "./users.service";
import { UserListComponent } from "./user-list/user-list.component";

import { AuthGuard } from "app/auth/helpers";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import { AvatarModule } from "ngx-avatar";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { CoreCommonModule } from "@core/common.module";
import { CoreDirectivesModule } from "@core/directives/directives";
import { CorePipesModule } from "@core/pipes/pipes.module";
import { CoreSidebarModule } from "@core/components";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

const routes: Routes = [
  {
    path: "view-all-user",
    component: UserListComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls: UsersService,
    },
  },
];
@NgModule({
  declarations: [UserListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CoreCommonModule,
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
  providers: [UsersService],
})
export class UserModule {}