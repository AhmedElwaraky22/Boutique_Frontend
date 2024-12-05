import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { TransactionsService } from "../status.service";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import Swal from "sweetalert2";
@Component({
  selector: "app-transactions-list",
  templateUrl: "./transactions-list.component.html",
  styleUrls: ["./transactions-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class TransactionsListComponent implements OnInit {
  pendingData: any[] = [];
  displayedData: any[] = [];
  ColumnMode = ColumnMode;
  selectedOption: number = 10;
  currentPage: number = 1;
  sortColumn: string = "";
  searchValue: string = "";
  showModal: boolean = false;
  selectedTransactionId: any;
  uploadedFile: File | null = null;
  isLoading: boolean = false;
  selectedTab: string = 'pending';  

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private _transaction: TransactionsService) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions(): void {
    this.isLoading = true;
    this._transaction.GetAllTransactions().subscribe(
      (res: any) => {
        this.pendingData = res;
        this.filterByTab();  
      },
      (error) => {
        console.error("Error occurred:", error);
        Swal.fire({ position: "center", icon: "error", title: "Failed to load transactions", showConfirmButton: false, timer: 1500 });
      },
      () => this.isLoading = false
    );
  }
  
  filterByTab(): void {
    switch (this.selectedTab) {
      case 'pending':
        this.displayedData = this.pendingData.filter(item => item.status === "pending");
        break;
      case 'approved':
        this.displayedData = this.pendingData.filter(item => item.status === "approved");
        break;
      case 'refused':
        this.displayedData = this.pendingData.filter(item => item.status === "refused");
        break;
      default:
        this.displayedData = this.pendingData;
    }
    this.filterUpdate();  
    this.updateLimit();   
  }

  
  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.filterByTab(); 
  }

  
  updateLimit(): void {
    const startIndex = (this.currentPage - 1) * this.selectedOption;
    const endIndex = startIndex + this.selectedOption;
    this.displayedData = this.displayedData.slice(startIndex, endIndex);
  }

  
  filterUpdate(): void {
    const searchLower = this.searchValue.toLowerCase();
    this.displayedData = this.displayedData.filter(item => 
      Object.values(item).some(value => String(value).toLowerCase().includes(searchLower))
    );
    this.currentPage = 1;
    this.updateLimit();
  }

  onApprove(id: any): void {
    this.selectedTransactionId = id;
    this.showModal = true;
  }

  
  onReject(transId: number): void {
    this.isLoading = true;
    this._transaction.rejectRequest(transId).subscribe(
      (res: any) => {
        Swal.fire({ position: "center", icon: "success", title: "Transaction Rejected", showConfirmButton: false, timer: 1500 });
        this.getAllTransactions();  
      },
      (error) => {
        console.log("Rejection error:", error);
        Swal.fire({ position: "center", icon: "error", title: "An error occurred while rejecting!", showConfirmButton: false, timer: 1500 });
      },
      () => this.isLoading = false
    );
  }

  closeModal = () => this.showModal = false;

  uploadPhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files.length) {
      this.uploadedFile = input.files[0];
      this.showModal = false;

      const formData = new FormData();
      formData.append('attachment', this.uploadedFile);

      this.isLoading = true;
      this._transaction.approveRequest(this.selectedTransactionId, formData).subscribe(
        (res: any) => {
          Swal.fire({ position: "center", icon: "success", title: "Transaction Approved", showConfirmButton: false, timer: 1500 });
          this.getAllTransactions();  
        },
        (error) => {
          console.error("Approval error:", error);
          Swal.fire({ position: "center", icon: "error", title: "An error occurred while approving!", showConfirmButton: false, timer: 1500 });
        },
        () => this.isLoading = false
      );
    } else {
      Swal.fire({ position: "center", icon: "warning", title: "No file selected.", showConfirmButton: false, timer: 1500 });
    }
  }
}