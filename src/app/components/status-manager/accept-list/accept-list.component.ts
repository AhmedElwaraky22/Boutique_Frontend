import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from '../status.service';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pending-list',
  templateUrl: './accept-list.component.html',
  styleUrls: ['./accept-list.component.scss']
})
export class AcceptListComponent implements OnInit {
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

  constructor(private _transaction: TransactionsService, private router: Router, private sanitizer: DomSanitizer) {}

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

  sortData(column: string): void {
    this.sortDirection = this.sortColumn === column && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortColumn = column;
    

    this.acceptData.sort((a, b) => {
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
    this.acceptData = this.acceptData.filter(item => Object.keys(item).some(key => String(item[key]).toLowerCase().includes(searchLower)));

    this.currentPage = 1;
    this.updateLimit();
  }

  updateLimit(): void {
    if (this.selectedOption === this.acceptData.length) {
      this.displayedData = this.acceptData;
    } else {
      const startIndex = (this.currentPage - 1) * this.selectedOption;
      const endIndex = startIndex + this.selectedOption;
      this.displayedData = this.acceptData.slice(startIndex, endIndex);
    }
  }

  onReject(id: any): void {
    const index = this.acceptData.findIndex(item => item.id === id);
    if (index !== -1) {
      this.acceptData[index].status = 'rejected';
      this.updateLimit();
    }
  }

  onApprove(id: any): void {
    this.selectedTransactionId = id;
    this.showModal = true;
  }

  uploadPhoto(id: any, event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const index = this.acceptData.findIndex(item => item.id === this.selectedTransactionId);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      this.showModal = false;
      this.acceptData[index].attachment = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
      this.acceptData[index].status = 'accepted';
      this.updateLimit();
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  nextPage(): void {
    if (this.currentPage * this.selectedOption < this.acceptData.length) {
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
    const totalPages = Math.ceil(this.acceptData.length / this.selectedOption);
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
    const totalPages = Math.ceil(this.acceptData.length / this.selectedOption);
    this.currentPage = totalPages; 
    this.updateLimit();
  }
  
}
