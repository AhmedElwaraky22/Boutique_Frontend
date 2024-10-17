import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvatarModule } from 'ngx-avatar';

import { CustomBreakPointsProvider } from 'app/layout/custom-breakpoints';
import { VerticalLayoutModule } from 'app/layout/vertical/vertical-layout.module';
import { HorizontalLayoutModule } from 'app/layout/horizontal/horizontal-layout.module';

@NgModule({
  imports: [FlexLayoutModule.withConfig({ disableDefaultBps: true }), VerticalLayoutModule, HorizontalLayoutModule,AvatarModule],
  providers: [CustomBreakPointsProvider],
  exports: [VerticalLayoutModule, HorizontalLayoutModule]
})
export class LayoutModule {}
