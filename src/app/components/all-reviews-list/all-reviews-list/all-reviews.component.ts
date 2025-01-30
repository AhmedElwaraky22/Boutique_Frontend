import { Component, OnInit } from '@angular/core';
import { AllReviewsService } from '../all-reviews.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-all-reviews',
  templateUrl: './all-reviews.component.html',
  styleUrls: ['./all-reviews.component.scss']
})
export class AllReviewsComponent implements OnInit {
  public rows: any[] = [];
  public tempData: any;
  public selectedOption: number = 10;
  public loadAddCat = true;
  public searchValue = "";
  public ColumnMode = ColumnMode;





  constructor(
    private _reviewService :AllReviewsService ,
    private modalService: NgbModal,
    
  ) { }

  ngOnInit(): void {
    this.getAllCategory()
  }


   // Get all Catogray 
   getAllCategory() {
    const startTime = new Date().getTime();
    this._reviewService.getAllCategory().subscribe(
      (res: any) => {
        const endTime = new Date().getTime();
        const duration = endTime - startTime;

        this.rows = res;
        this.tempData = res;
        console.log(this.rows);


        console.log(`Request started at: ${new Date(startTime).toISOString()}`);
        console.log(`Response received at: ${new Date(endTime).toISOString()}`);
        console.log(`Time taken for request and response: ${duration} ms`);

      },
      (er: any) => {
        console.log(er);
        const endTime = new Date().getTime();
        const duration = endTime - startTime;
        console.log(`Request started at: ${new Date(startTime).toISOString()}`);
        console.log(`Error received at: ${new Date(endTime).toISOString()}`);
        console.log(`Time taken for request and response (with error): ${duration} ms`);
      }
    );
  }

  filterUpdate(event: any) {
  }
  addCategoryModel(){}
}
