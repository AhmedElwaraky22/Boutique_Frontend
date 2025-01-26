import { StoreReport } from '../../../main/sample/modules/store-report';
import { ApexChartInterFace } from '../../../main/sample/modules/apex-chart';
import { Component, NgModule, OnInit, ViewEncapsulation } from '@angular/core';
import { HomeService } from 'app/components/home/home.service';


import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexDataLabels,
  ApexXAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexPlotOptions,
  ApexYAxis,
  ApexFill,
  ApexMarkers,
  ApexTheme,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexResponsive,
  ApexStates,

} from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

export interface ChartOptions2 {
  // Apex-non-axis-chart-series
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  stroke?: ApexStroke;
  tooltip?: ApexTooltip;
  dataLabels?: ApexDataLabels;
  fill?: ApexFill;
  colors?: string[];
  legend?: ApexLegend;
  labels?: any;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  markers?: ApexMarkers[];
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  states?: ApexStates;
}

@Component({
  selector: 'app-home-new',
  templateUrl: '../home-list/home-new.component.html',
  styleUrls: ['../home-list/home-new.component.scss']
})
export class HomeNewComponent implements OnInit {
  public isMenuToggled = false;
  public productCount: number;
  public users_count: number;
  public stores_count: number;
  public orders_count: number;
  public orders;
  public requst_count: number;
  public contentHeader: object;
  public apexDonutChart: Partial<ChartOptions2>;
  public apexRadialChart: Partial<ChartOptions2>;
  public StoreReport: StoreReport;
  public UserReport: ApexChartInterFace;
  public OrderReport: any;
  public TotalUser: number = 0;
  public TotalStore: number = 0;



// Create Role 
  public createRoleForm: FormGroup;
  public createRoleFormSubmitted = false;
  public modalReference;
  public roles;
  public restrictions;
  public getRoleData;
  public isLoading = false;




  seriess = [
    {
      name: 'Sessions',
      data: [75, 125, 225, 175, 125, 75, 25]
    }
  ];


  apexLineChart = {
    series: [
      {
        name: "Orders",
        data: [10, 15, 20, 25, 30, 35] // Example data
      }
    ],
    chart: {
      type: 'line',
      height: 400
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] // Example labels
    },
    colors: ['#7367F0'], // Line color
    stroke: {
      width: 2
    },
    dataLabels: {
      enabled: true
    },
    legend: {
      show: true
    }
  };


  chartColors = {
    column: {
      series1: '#826a38DEE4f9',
      series2: '#d2b0ff',
      bg: '#ffffff'
    },
    success: {
      shade_100: '#7eefc7',
      shade_200: '#06774f'
    },
    donut: {
      series1: '#DC4848',
      series2: '#A1DFA7',
      series3: '#826bf8',
      series4: '#2b9bf4',
      series5: '#FFA1A1',
      series6: '#38DEE4',
      series7: '#09c',
    },
    area: {
      series3: '#38DEE4',
      series2: '#38DEE4',
      series1: '#38DEE4'
    }
  };

  constructor(
     private fb: FormBuilder,
      private modalService: NgbModal,
      private _homeServeice: HomeService
  ){ 
    this.createRoleForm=this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      phone: [null, [Validators.pattern(/^(01[0-9]{9}|7[0-9]{7})$/)]],
      role: ['', [Validators.required]],
      restriction_name: [[], [Validators.required]]
      })
  }

  ngOnInit() {
    
    this.get_data();
    this.getRole();
    this.getRestrictions();

    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
      }
    };

    this._homeServeice.GetAllStoreReport().subscribe(
      data => {
        this.StoreReport = data;
        this.TotalStore = this.StoreReport.store_series[0];
        this.StoreReport.store_series.shift();
        this.StoreReport.store_labels.shift();
        this.Ratio();
      },
      error => {
        this.StoreReport = {
          store_labels: ["No Store Report"],
          store_series: [0]
        } as StoreReport;
      }
    );

    this._homeServeice.GetUserApex().subscribe(
      data => {
        this.UserReport = data;
        this.TotalUser = this.UserReport.total;
        this.Statistics();
      },
      error => {
        this.UserReport = {
          labels: ["No User Report"],
          series: [0]
        } as ApexChartInterFace;
      }
    );

   

  

  }


  get_data() {
    this._homeServeice.GetAllData().subscribe(
      data => {
        // console.log('Data received from GetAllData:', data); // Log the entire response

        this.stores_count = data[0].Total_Store;
        this.users_count = data[0].users_count;
        this.productCount = data[0].products_count;
        this.requst_count = data[0].new_request;
        this.orders_count = data[0].Total_orders;


        // console.log('Parsed values:');
        // console.log('Stores Count:', this.stores_count);
        // console.log('Users Count:', this.users_count);
        // console.log('Product Count:', this.productCount);
        // console.log('Request Count:', this.requst_count);
        // console.log('Orders Count:', this.orders_count);
      },
      error => {
        console.error('Error occurred while fetching data:', error); // Log the error
      }
    );
  }

  Ratio() {
    const TotalStore = this.TotalStore;
    this.apexDonutChart = {
      series: this.StoreReport.store_series,
      chart: {
        height: 400,
        type: 'donut'
      },
      colors: [
        this.chartColors.donut.series3,
        this.chartColors.donut.series2,
        this.chartColors.donut.series7,
        this.chartColors.donut.series1,
        this.chartColors.donut.series5,
        this.chartColors.donut.series6,
      ],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                fontSize: '2rem',
                fontFamily: 'Montserrat'
              },
              value: {
                fontSize: '1rem',
                fontFamily: 'Montserrat',
                formatter: function (val) {
                  return parseInt(val) + '%';
                }
              },
              total: {
                show: true,
                fontSize: '1.5rem',
                label: 'Total',
                formatter: function (w) {
                  return TotalStore.toString();
                }
              }
            }
          }
        }
      },
      legend: {
        show: true,
        position: 'bottom'
      },
      labels: this.StoreReport.store_labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 400
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  Statistics() {
    const t = this.TotalUser;
    this.apexRadialChart = {
      series: this.UserReport.series,
      labels: this.UserReport.labels,
      chart: {
        height: 400,
        type: 'radialBar'
      },
      colors: [
        this.chartColors.donut.series5,
        this.chartColors.donut.series7,
        this.chartColors.donut.series3,
        this.chartColors.donut.series2,
        this.chartColors.donut.series1,
        this.chartColors.donut.series4
      ],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '10%'
          },
          track: {
            margin: 15
          },
          dataLabels: {
            name: {
              fontSize: '3rem',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '1rem',
              fontFamily: 'Montserrat'
            },
            total: {
              show: true,
              fontSize: '1rem',
              label: 'Total Users',
              formatter: function (w) {
                return t.toString();;
              }
            }
          }
        }
      },
      legend: {
        show: true,
        position: 'bottom'
      },
      stroke: {
        lineCap: 'round'
      }
    };
  }


  // Get All Restirctions
  getRestrictions(): void {
    this._homeServeice.getAllRestrictions().subscribe({
      next: (res: any) => {
        this.restrictions = res.Restrictions
        console.log('restrictions:', this.restrictions);
      },
      error: (error) => {
        console.error('Error fetching restrictions:', error);
      }
    });
  }

  // Get Role
  getRole(){
    this._homeServeice.getAllRoles().subscribe({
      next: (res: any) => {
        this.roles = res.roles
        console.log('Roles:', this.roles);
      },
      error: (error) => {
        console.error('Error fetching restrictions:', error);
      }
    });
  }

  // Model Add Account
  ModelAddRole(modelCreateRole){
    this.createRoleFormSubmitted = false;
    this.createRoleForm.reset();
    this.modalReference = this.modalService.open(modelCreateRole, {
      backdrop: false,
      centered: true,
    });
  }

  // create Role Form Method
  createRoleFormMethod(){
    this.isLoading = true;
    this.createRoleFormSubmitted = true;

    if (this.createRoleForm.invalid) {
      return;
    }

    // Create FormData
    const formValues = this.createRoleForm.value;    
    const formData = new FormData();
    formData.append('firstName', formValues.firstName);
    formData.append('lastName', formValues.lastName);
    formData.append('email', formValues.email);
    formData.append('password', formValues.password);
    formData.append('phone', formValues.phone);
    formData.append('role', formValues.role);
     if (formValues.restriction_name && formValues.restriction_name.length > 0) {
      formValues.restriction_name.forEach((restriction, index) => {
        formData.append(`restriction_name[${index}]`, restriction);
      });
    }


    console.log('firstName', formValues.firstName);
    console.log('lastName', formValues.lastName);
    console.log('email', formValues.email);
    console.log('password', formValues.password);
    console.log('phone', formValues.phone);
    console.log('role', formValues.role);
    console.log('restriction_name', formValues.restriction_name);
  
  
    // Example: Post formData to your backend
    this._homeServeice.Register(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Account created successfully',
          confirmButtonText: 'OK'
        }).then(() => {
          // Close the modal
          this.modalReference.close();
        });
      },
      error: (error) => {
        console.log(error.message);
      
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error|| 'Failed to create account',
          confirmButtonText: 'Try Again'
        });
      }
    });
  }

}

// // Define HomeModule
// @NgModule({
//   declarations: [
//     HomeNewComponent
//   ],
//   imports: [
//     CommonModule
//   ],
//   providers: [HomeService],
//   exports: [
//     HomeNewComponent
//   ]    
// })
// export class HomeModule { }