import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShipmentservService } from '../shipmentserv.service';

@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.scss']
})




export class ShipmentDetailsComponent implements OnInit {
public shipmentDetails: any;
public shipment_id : any;

  constructor(
    private shipmentService : ShipmentservService,
        private route: ActivatedRoute  
    
  ) {}

  ngOnInit(): void {
    this.shipment_id = this.route.snapshot.paramMap.get('id')!;
    this.getShipmentDetails(this.shipment_id);
  }


  getShipmentDetails(id: any) {
    this.shipmentService.getShipmentDetails(id).subscribe(
      (response) => {
        this.shipmentDetails = response;
        console.log('Shipment details:', response);
      },
      (error) => {
        console.error('Error fetching shipment details:', error);
      }
    );
  }

}
