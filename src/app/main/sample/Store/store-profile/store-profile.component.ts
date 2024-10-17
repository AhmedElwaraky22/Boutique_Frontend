import { StoreServicesService } from './../../services/store-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StoreProfile } from '../../modules/store-profile';

@Component({
  selector: 'app-store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.scss']
})
export class StoreProfileComponent implements OnInit {
  store_data:StoreProfile
  store_id =this.route.snapshot.params['id']
  public toggleMenu = true;
  public contentHeader: object;

  constructor( private router: Router, private route: ActivatedRoute , private _storesevices:StoreServicesService) { }

  ngOnInit(): void {
    this.getstoredata();


    this.contentHeader = {
      headerTitle: 'Profile',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'ALL STORE',
            isLink: true,
            link: '/all-store'
          },
          {
            name: this.store_id,
            isLink: false
          }
        ]
      }
    };
  }



  getstoredata(){
    this._storesevices.store_profile(this.store_id).subscribe((res:StoreProfile)=>{
      this.store_data= res;
      console.log(this.store_data);
    },
    (error:any)=>{
      console.log(error);
    }
    );
  }
}
