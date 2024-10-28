import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from '../status.service';
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss']
})

export class PendingListComponent implements OnInit {
  pendingData: any[] = [];
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

  constructor(private _transaction: TransactionsService, private sanitizer: DomSanitizer,) {}

  ngOnInit(): void {
    this.GetAllTransactions();
  }

  GetAllTransactions(): void {
    this._transaction.GetAllTransactions().subscribe(
      (res: any) => { 
        this.pendingData = res.filter((item: any) => item.status === "pending");
        this.updateLimit(); 
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }

  sortData(column: string): void {
    this.sortDirection = this.sortColumn === column && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortColumn = column;
    
    this.pendingData.sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];
    
        const isANumber = !isNaN(Number(aValue));
        const isBNumber = !isNaN(Number(bValue));
    
        if (isANumber && isBNumber) {
            // Both are numbers
            return this.sortDirection === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
        } else {
            // Treat as strings
            return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
    });
    this.updateLimit();
}

  filterUpdate(): void {
    const searchLower = this.searchValue.toLowerCase();
    this.pendingData = this.pendingData.filter(item => 
      Object.keys(item).some(key => 
        String(item[key]).toLowerCase().includes(searchLower)
      )
    );
    this.currentPage = 1;
    this.updateLimit();
  }

  updateLimit(): void {
    const startIndex = (this.currentPage - 1) * this.selectedOption;
    const endIndex = startIndex + this.selectedOption;
    this.displayedData = this.pendingData.slice(startIndex, endIndex);
  }

  onReject(id: any): void {
    const index = this.pendingData.findIndex(item => item.id === id);
    if (index !== -1) {
      this.pendingData[index].status = 'rejected';
      this.GetAllTransactions();
    }
  }

  onApprove(id: any): void {
    this.selectedTransactionId = id;
    this.showModal = true;
  }

  uploadPhoto(id: any, event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const index = this.pendingData.findIndex(item => item.id === this.selectedTransactionId);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      this.showModal = false;
      this.pendingData[index].attachment = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
      this.pendingData[index].status = 'accepted';
      this.updateLimit();
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  nextPage(): void {
    if (this.currentPage * this.selectedOption < this.pendingData.length) {
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
    const totalPages = Math.ceil(this.pendingData.length / this.selectedOption);
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
    const totalPages = Math.ceil(this.pendingData.length / this.selectedOption);
    this.currentPage = totalPages;
    this.updateLimit();
  }
}
