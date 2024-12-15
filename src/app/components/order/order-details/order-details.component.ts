import { Component, OnInit } from '@angular/core';
import { OrderservService } from '../orderserv.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public orderDetails: any;
  public isLoading: boolean = false; 
  public orderId: string = ''; 
  public change_id ;
  public shipment_id ;
  
  constructor(
    private _orderServices: OrderservService,
    private route: ActivatedRoute  
  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id')!;
    this.getOrderDetails(this.orderId);  
    // this.cancelOrder()
  }

  getOrderDetails(id): void {  
    this.shipment_id = id
    this.isLoading = true; 
    console.log(this.shipment_id);  
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



// On The Way 
onTheWay(status_id: number): void {
  console.log(this.shipment_id);
  console.log(status_id);

  this._orderServices.ChangeStatus(this.shipment_id , status_id).subscribe({
    next: (response) => {
      console.log('Status updated successfully:', response);
      // Show success notification
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: 'The order status has been updated successfully!',
        confirmButtonText: 'OK'
      });
    },
    error: (error) => {
      console.error('Error updating status:', error);
      // Show error notification
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'An error occurred while updating the order status. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  });
}


  Delivered(status_id){
    console.log(this.shipment_id);
    console.log(status_id);

  this._orderServices.ChangeStatus(status_id,this.shipment_id).subscribe({
    next: (response) => {
      console.log('Status updated successfully:', response);
      // Show success notification
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: 'The order status has been updated successfully!',
        confirmButtonText: 'OK'
      });
    },
    error: (error) => {
      console.error('Error updating status:', error);
      // Show error notification
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'An error occurred while updating the order status. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  });
    
  }

  // cancelOrder
  cancelOrder(status_id) {
    console.log(status_id);
  }

  ReactiveOSFormOnSubmit() {
    // this.ReactiveOrderStatusFormSubmitted = true;

    // if (this.ReactiveOrderStatusForm.invalid) {
    //   return;
    // }
    // console.log(this.ReactiveOrderStatusForm.value);

    // this.ReactiveOSForm.change_id.patchValue(
    //   this.ReactiveOSForm.change_id.value.map(function (item) {
    //     return item["value"];
    //   })
    // );
    // this.ReactiveOSForm.change_id.patchValue(
    //   this.ReactiveOSForm.change_id.value.toString()
    // );
    // console.log(this.ReactiveOrderStatusForm.value);
    // return;
    
    // this._orderServices
    //   .ChangeStatus(this.ReactiveOrderStatusForm.value, this.shipment_id)
    //   .subscribe(
    //     (re: any) => {
    //       this.getAllOrders();
    //       this.modalReference.close();
    //       Swal.fire({
    //         position: "center",
    //         icon: "success",
    //         title: "Order Status Has been Changed Successfully ",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     },
    //     (er: any) => {
    //       Swal.fire({
    //         position: "center",
    //         icon: "error",
    //         title: "An Error Occurred While change Order Status !",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     }
      // );
  }



}
