import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MenuListComponent } from './menu-list/menu-list.component';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  declarations: [MenuListComponent ],
  imports: [
    CommonModule
  ]
  , providers: [  {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }]
})
export class MenuModule { }
