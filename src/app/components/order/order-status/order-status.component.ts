import { Component, OnInit } from '@angular/core';
import { OrderservService } from '../orderserv.service';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
