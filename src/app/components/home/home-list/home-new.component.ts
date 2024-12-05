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

  constructor(private _homeServeice: HomeService) {}

  ngOnInit() {
    this.get_data();

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
        console.log('Data received from GetAllData:', data); // Log the entire response
  
        this.stores_count = data[0].Total_Store;
        this.users_count = data[0].users_count;
        this.productCount = data[0].products_count;
        this.requst_count = data[0].new_request;
        this.orders_count = data[0].Total_orders;

  
        console.log('Parsed values:');
        console.log('Stores Count:', this.stores_count);
        console.log('Users Count:', this.users_count);
        console.log('Product Count:', this.productCount);
        console.log('Request Count:', this.requst_count);
        console.log('Orders Count:', this.orders_count);
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