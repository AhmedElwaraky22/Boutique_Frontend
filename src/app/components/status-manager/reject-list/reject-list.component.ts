import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from '../status.service';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reject-list',
  templateUrl: './reject-list.component.html',
  styleUrls: ['./reject-list.component.scss'],
})

export class RejectListComponent implements OnInit {
  rejectData: any[] = [];
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
        this.rejectData = res.filter((item: any) => item.status === "rejected");
        this.updateLimit(); 
      },
      (error) => console.error('Error occurred:', error)
    );
  }

  sortData(column: string): void {
    this.sortDirection = this.sortColumn === column && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortColumn = column;

    this.rejectData.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.updateLimit();
  }

  filterUpdate(): void {
    const searchLower = this.searchValue.toLowerCase();
    this.rejectData = this.rejectData.filter(item => 
      Object.keys(item).some(key => 
        String(item[key]).toLowerCase().includes(searchLower)
      )
    );

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

  // onDelete(id: any): void {
  //   const index = this.rejectData.findIndex(item => item.id === id);
  //   if (index !== -1) {
  //     this.rejectData.splice(index,1);
  //     this.updateLimit();
  //   }
  // }

  onApprove(id: any): void {
    this.selectedTransactionId = id;
    this.showModal = true;
    this.updateLimit();
  }

  uploadPhoto(id: any, event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const index = this.rejectData.findIndex(item => item.id === this.selectedTransactionId);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      this.showModal = false;
      this.rejectData[index].attachment = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
      this.rejectData[index].status = 'accepted';
      this.updateLimit();
    }
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