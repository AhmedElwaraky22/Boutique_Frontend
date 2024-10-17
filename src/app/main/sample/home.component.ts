import { ApexChartInterFace } from './modules/apex-chart';
import { StoreReport } from './modules/store-report';
import { HomeService } from '../../components/home/home.service';
import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core'
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
  ApexStates
} from 'ng-apexcharts';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None

})

export class HomeComponent implements OnInit {


  seriess= [
    {
      name: 'Sessions',
      data: [75, 125, 225, 175, 125, 75, 25]
    }
  ];
  
  public isMenuToggled = false;
  public productCount;
  public users_count;
  public stores_count;
  public requst_count;
  public contentHeader: object
  public apexDonutChart: Partial<ChartOptions2>;
  chartColors = {
    column: {
      series1: '#826af9',
      series2: '#d2b0ff',
      bg: '#f8d3ff'
    },
    success: {
      shade_100: '#7eefc7',
      shade_200: '#06774f'
    },
    donut: {
      series1: '#3c4776',
      series2: '#00d4bd',
      series3: '#826bf8',
      series4: '#2b9bf4',
      series5: '#FFA1A1',
      series6: '#06177f',
      series7: '#FA663C',
    },
    area: {
      series3: '#a4f8cd',
      series2: '#60f2ca',
      series1: '#2bdac7'
    }
  };



  public StoreReport:StoreReport;
  public UserReport:ApexChartInterFace;
  public OrderReport:any;
  public TotalUser:any=0;
  public TotalStore:any=0;
  public apexRadialChart: Partial<ChartOptions2>;

  constructor(private _homeServeice:HomeService) {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {


    this.get_data()
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
      
      }
    }


    this._homeServeice.GetAllStoreReport().subscribe(data => {

        this.StoreReport=data;  
        this.TotalStore= this.StoreReport.store_series[0];  
        this.StoreReport.store_series.shift();
        this.StoreReport.store_labels.shift();

       this.Ratio();
    },error => {
      this.StoreReport.store_labels=["No Store Report"]
      this.StoreReport.store_series=[0]

    })


    this._homeServeice.GetUserApex().subscribe(data => {

        this.UserReport=data;    
        this.TotalUser=this.UserReport.total,  


       this.Statistics();
    },error => {
      this.UserReport.labels=["No Store Report"]
      this.UserReport.series=[0]

    })



      
  
  }



get_data(){

  this._homeServeice.GetAllData().subscribe(data => {

       this.stores_count=data[0].Total_Store;
       this.users_count=data[0].users_count;
       this.productCount=data[0].products_count ;
       this.requst_count=data[0].new_request;
},error => {
  

})



}







  
  Ratio(){
    var TotalStore =this.TotalStore
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
                  return TotalStore;
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
      labels:   this.StoreReport.store_labels,
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


  Statistics(){
    const t = this.TotalUser;
    this.apexRadialChart = {
      series: this.UserReport.series,
      labels: this.UserReport.labels,
      chart: {
        height: 400,
        type: 'radialBar'
      },
      colors: [this.chartColors.donut.series5,
         this.chartColors.donut.series7,
         this.chartColors.donut.series3,
         this.chartColors.donut.series2,
         this.chartColors.donut.series1,
          this.chartColors.donut.series4 
        ],
      plotOptions: {
        radialBar: {
          // size: 185,
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
                return t;
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
