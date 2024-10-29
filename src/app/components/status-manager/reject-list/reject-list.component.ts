import { Component, OnInit, ViewChild } from "@angular/core";
import { TransactionsService } from "../status.service";
import { Router } from "@angular/router";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import Swal from "sweetalert2";

@Component({
  selector: "app-reject-list",
  templateUrl: "./reject-list.component.html",
  styleUrls: ["./reject-list.component.scss"],
})
export class RejectListComponent implements OnInit {
  rejectData: any[] = [];
  displayedData: any[] = [];
  ColumnMode = ColumnMode;
  selectedOption: number = 10;
  currentPage: number = 1;
  sortColumn: string = "";
  sortDirection: "asc" | "desc" = "asc";
  searchValue: string = "";
  showModal: boolean = false;
  selectedTransactionId: any;
  uploadedFile: any;
  fileName: any;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private _transaction: TransactionsService,private router: Router) {}

  ngOnInit(): void {
    this.GetAllTransactions();
  }

  GetAllTransactions(): void {
    this._transaction.GetAllTransactions().subscribe(
      (res: any) => {
        this.rejectData = res.filter((item: any) => item.status === "refused");
        this.updateLimit();
      },
      (error) => console.error("Error occurred:", error)
    );
  }

  sortData(column: string): void {
    this.sortDirection = this.sortColumn === column && this.sortDirection === "asc" ? "desc" : "asc";
    this.sortColumn = column;

    this.rejectData.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      const isANumber = !isNaN(Number(aValue));
      const isBNumber = !isNaN(Number(bValue));

      if (isANumber && isBNumber) {
        // Treat as numbers
        return this.sortDirection === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
      } else {
        // Treat as strings
        return this.sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
    });

    this.updateLimit();
  }

  filterUpdate(): void {
    const searchLower = this.searchValue.toLowerCase();

    this.rejectData = this.rejectData.filter((item) => Object.keys(item).some((key) => String(item[key]).toLowerCase().includes(searchLower)));
    this.currentPage = 1;
    this.updateLimit();
  }

  updateLimit(): void {
    if (this.selectedOption === this.rejectData.length) {
      this.displayedData = this.rejectData;
    } else {
      const startIndex = (this.currentPage - 1) * this.selectedOption;
      const endIndex = startIndex + this.selectedOption;
      this.displayedData = this.rejectData.slice(startIndex, endIndex);
    }
  }

  onApprove(id: any): void {
    this.selectedTransactionId = id;
    this.showModal = true;
    this.updateLimit();
  }

  uploadPhoto(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0].name; // Check for selected file
    this.showModal = false;

    if (file) {
      const formData = new FormData();
      formData.append("attachment", file); // Append the file

      // Call the API to approve the transaction with the uploaded file
      this._transaction.approveRequest(this.selectedTransactionId, formData).subscribe(
          (res: any) => {
            Swal.fire({position: "center",icon: "success",title: "Transaction Approved",showConfirmButton: false,timer: 1500});
            this.closeModal(); // Close modal after successful upload
            this.GetAllTransactions(); // Refresh the transaction list
          },
          (error) => {
            Swal.fire({position: "center",icon: "error",title: "An error occurred while Approving!",showConfirmButton: false,timer: 1500});
            console.error("Upload error:", error); // Log the error for debugging
          }
        );
    } else {
      Swal.fire({position: "center",icon: "warning",title: "No file selected.",showConfirmButton: false,timer: 1500});
    }
  }

  approveRequest(): void {
    const formData = new FormData();
    formData.append("attachment", this.fileName);
    this._transaction
      .approveRequest(this.selectedTransactionId, formData)
      .subscribe(
        (res: any) => {
          Swal.fire({position: "center",icon: "success",title: "Transaction Approved",showConfirmButton: false,timer: 1500});
          this.updateLimit();
        },
        (error) => {
          Swal.fire({position: "center",icon: "error",title: "An error occurred while Approving!",showConfirmButton: false,timer: 1500});
        }
      );
  }

  closeModal(): void {
    this.showModal = false;
  }

  nextPage(): void {
    if (this.currentPage * this.selectedOption < this.rejectData.length) {
      this.currentPage++;
      this.updateLimit();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateLimit();
    }
  }

  getPagesArray(): number[] {
    const totalPages = Math.ceil(this.rejectData.length / this.selectedOption);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updateLimit();
  }

  skipBack(): void {
    this.currentPage = 1;
    this.updateLimit();
  }

  skipForward(): void {
    const totalPages = Math.ceil(this.rejectData.length / this.selectedOption);
    this.currentPage = totalPages;
    this.updateLimit();
  }
}
