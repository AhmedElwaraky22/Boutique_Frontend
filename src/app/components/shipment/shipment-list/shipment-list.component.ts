import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShipmentservService } from '../shipmentserv.service';
import { ColumnMode } from '@swimlane/ngx-datatable';



@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss']
})
export class ShipmentListComponent implements OnInit {
  public isLoading =false ;
  public selectedStatus = 'Pending'; // Default active status
  public selectedOption = 10;
  public searchValue = "";
  public ColumnMode = ColumnMode;
  public rows = []; // Data source for the table
  public tempData = []; // Data source for the table


    // Shipment Status
    public shipmentStatus: any = [
      { name: "Pending", value: "Pending" },
      { name: "Preparing", value: "Preparing" },
      { name: "Previous", value: "Previous" },
      { name: "On The Way", value: "On The Way"},
      { name: "Delivered", value: "Delivered" },
    ];

  constructor(private _shipmentsServices :ShipmentservService) { }

  ngOnInit(): void {
    this.onStatusChange(this.selectedStatus); // Load default status data

  }

// Change status 
  onStatusChange(status: string): void {
    this.selectedStatus = status; // Update the selected status
    this.isLoading = true;

    switch (status) {
      case "Pending":
        this.getAllShipments();   ///pending
        break;
      case "Preparing":
        this.getAllPreparedShip();
        break;
      case "Previous":
        this.getAllPreviousShip();
        break;
      case "On The Way":
        this.getAllOnWayShip();
        break;
      case "Delivered":
        this.getAllDeliveredShip();
        break;
      default:
        this.isLoading = false;
        console.log("Unknown status:", status);
    }
  }

//Pending Shipments
  getAllShipments(){
    this._shipmentsServices.getAllPerviousShipment().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.rows = res.data;
        this.tempData = res;  
      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  // Preparing Shipments 
  getAllPreparedShip(){
    this._shipmentsServices.getAllPreparingShipment().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.rows = res.data;
        this.tempData = res;  
      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  // Pervious Shipments 
  getAllPreviousShip(){
    this._shipmentsServices.getAllPerviousShipment().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.rows = res.data;
        this.tempData = res;  
      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  // On The Way Shipments 
  getAllOnWayShip(){
    this._shipmentsServices.getAllOnTheWayShipment().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.rows = res.data;
        this.tempData = res;  
      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  // Delivered Shipments 
  getAllDeliveredShip(){}



  filterUpdate(e){}

}
