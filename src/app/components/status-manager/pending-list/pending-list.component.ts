import { Component, OnInit, ViewChild } from "@angular/core";
import { TransactionsService } from "../status.service";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import Swal from "sweetalert2";

@Component({
  selector: "app-pending-list",
  templateUrl: "./pending-list.component.html",
  styleUrls: ["./pending-list.component.scss"],
})
export class PendingListComponent implements OnInit {
  pendingData: any[] = [];
  displayedData: any[] = [];
  ColumnMode = ColumnMode;
  selectedOption: number = 10;
  currentPage: number = 1;
  sortColumn: string = "";
  sortDirection: "asc" | "desc" = "asc";
  searchValue: string = "";
  showModal: boolean = false;
  selectedTransactionId: any;
  uploadedFile: File | null = null;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private transactionService: TransactionsService) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions(): void {
    this.transactionService.GetAllTransactions().subscribe(
      (res: any) => {
        this.pendingData = res.filter((item: any) => item.status === "pending");
        this.updateLimit();
      },
      (error) => {
        console.error("Error occurred:", error);
        Swal.fire({ position: "center", icon: "error", title: "Failed to load transactions", showConfirmButton: false, timer: 1500 });
      }
    );
  }

  filterUpdate(): void {
    const searchLower = this.searchValue.toLowerCase();
    this.pendingData = this.pendingData.filter(item =>
      Object.values(item).some(value => String(value).toLowerCase().includes(searchLower))
    );
    this.currentPage = 1;
    this.updateLimit();
  }

  updateLimit(): void {
    const startIndex = (this.currentPage - 1) * this.selectedOption;
    const endIndex = startIndex + this.selectedOption;
    this.displayedData = this.pendingData.slice(startIndex, endIndex);
  }

  onApprove(id: any): void {
    this.selectedTransactionId = id;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.uploadedFile = null; // Reset file when closing modal
  }

  uploadPhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files.length) {
      this.uploadedFile = input.files[0];
      this.showModal = false;

      const formData = new FormData();
      formData.append('attachment', this.uploadedFile); // Append file correctly

      this.transactionService.approveRequest(this.selectedTransactionId, formData).subscribe(
        (res: any) => {
          Swal.fire({ position: "center", icon: "success", title: "Transaction Approved", showConfirmButton: false, timer: 1500 });
          this.getAllTransactions();
        },
        (error) => {
          console.error("Approval error:", error);
          Swal.fire({ position: "center", icon: "error", title: "An error occurred while approving!", showConfirmButton: false, timer: 1500 });
        }
      );
    } else {
      Swal.fire({ position: "center", icon: "warning", title: "No file selected.", showConfirmButton: false, timer: 1500 });
    }
  }

  onReject(transId: number): void {
    this.transactionService.rejectRequest(transId).subscribe(
      (res: any) => {
        Swal.fire({ position: "center", icon: "success", title: "Transaction Rejected", showConfirmButton: false, timer: 1500 });
        this.getAllTransactions();
      },
      (error) => {
        console.error("Rejection error:", error);
        Swal.fire({ position: "center", icon: "error", title: "An error occurred while rejecting!", showConfirmButton: false, timer: 1500 });
      }
    );
  }
}
