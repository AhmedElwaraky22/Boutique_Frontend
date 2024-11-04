import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from '../status.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pending-list',
  templateUrl: './accept-list.component.html',
  styleUrls: ['./accept-list.component.scss']
})

export class AcceptListComponent implements OnInit {
  UploadAttachment:FormGroup;
  acceptData: any[] = [];
  displayedData: any[] = []; 
  ColumnMode = ColumnMode;
  selectedOption: number = 10; 
  currentPage: number = 1; 
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc'; 
  searchValue: string = '';
  showModal: boolean = false; 
  selectedTransactionId: any; 

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private _transaction: TransactionsService, private router: Router, private fb:FormBuilder) {
    this.UploadAttachment = this.fb.group({attachment:[null]});
  }
  ngOnInit(): void {
    this.GetAllTransactions();
  }

  GetAllTransactions(): void {
    this._transaction.GetAllTransactions().subscribe(
      (res: any) => { 
        this.acceptData = res.filter((item: any) => item.status === "approved");
        this.updateLimit(); 
      },
      (error) => console.error('Error occurred:', error)
    );
  }

// Search
  filterUpdate(): void {
    const searchLower = this.searchValue.toLowerCase();
    this.acceptData = this.acceptData.filter(item => Object.keys(item).some(key => String(item[key]).toLowerCase().includes(searchLower)));

    this.currentPage = 1;
    this.updateLimit();
  }

  // Show no
  updateLimit(): void {
    if (this.selectedOption === this.acceptData.length) {
      this.displayedData = this.acceptData;
    } else {
      const startIndex = (this.currentPage - 1) * this.selectedOption;
      const endIndex = startIndex + this.selectedOption;
      this.displayedData = this.acceptData.slice(startIndex, endIndex);
    }
  }

  // Approve
  onApprove(id: any): void {
    this.selectedTransactionId = id;
    this.showModal = true;
  }

  uploadPhoto(event: Event): void {
    const input = event.target as HTMLInputElement; // Cast to HTMLInputElement
    const file = input.files[0].name; // Check for selected file
    this.closeModal();
    
    if (file) {
        const formData = new FormData();
        formData.append('attachment', file); // Append the file

        // Call the API to approve the transaction with the uploaded file
        this._transaction.approveRequest(this.selectedTransactionId, formData).subscribe(
            (res: any) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Transaction Approved",
                    showConfirmButton: false,
                    timer: 1500,
                });
                this.closeModal(); // Close modal after successful upload
                this.GetAllTransactions(); // Refresh the transaction list
            },
            (error) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "An error occurred while Approving!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.error('Upload error:', error); // Log the error for debugging
            }
        );
    } else {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "No file selected.",
            showConfirmButton: false,
            timer: 1500,
        });
    }
}

  closeModal(): void {
    this.showModal = false;
  }
}
