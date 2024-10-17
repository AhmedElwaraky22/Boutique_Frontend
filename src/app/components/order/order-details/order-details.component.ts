import { Component, OnInit } from '@angular/core';
import { OrderservService } from '../orderserv.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public orderDetails: any;
  public isLoading: boolean = false; 
  public orderId: string = ''; 
  
  constructor(
    private _orderServices: OrderservService,
    private route: ActivatedRoute  
  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id')!;
    this.getOrderDetails(this.orderId);  
  }

  getOrderDetails(id): void {  
    this.isLoading = true; 
    console.log(id);  

    this._orderServices.GetOrderById(id).subscribe(
      (response) => {
        this.orderDetails = response[0]; 

        this.isLoading = false;
        console.log('Order details:', this.orderDetails); 
      },
      (error) => {
        this.isLoading = false; 
        console.error('Error:', error); 
      }
    );
  }
}
