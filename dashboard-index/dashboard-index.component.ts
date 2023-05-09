import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Reclamation} from "../../reclamation";
import {ReclamationService} from "../../reclamation.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import { interval } from 'rxjs';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  ChartComponent
} from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type ChartOptionsBar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
}

@Component({
  selector: 'll-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.scss']
})
export class DashboardIndexComponent implements OnInit {
 

  descFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  listRec: Reclamation[];
  rec = new Reclamation();
  reclamation = new Reclamation();
  userId =2;
  @ViewChild("chart") chart: ChartComponent;
  @ViewChild("Barchart") Barchart: ChartComponent;
  public chartOptions: Partial<ChartOptions>| any;
  public chartOptionsBar: Partial<ChartOptionsBar>| any;
  branches: any = [];
  constructor(private recServices:ReclamationService , private route: Router,public dialog: MatDialog){
    this.chartOptions = {
      series: [],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.chartOptionsBar = {
      series: [
      ],
      chart: {
        height: 450,
        type: "bar"
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: true
      },
      xaxis: {

        labels: {
          style: {
            colors: [
            ],
            fontSize: "12px"
          }
        }
      },
      yaxis: {
        reversed: false,
      }
    };

  }



  ngOnInit(): void {
    this.refreshData();
    setInterval(() => this.archiveReclamationResolu(1), 10000);
  }

  refreshData() {
    this.recServices.countByStatus().subscribe((response3: any) => {
      console.log(response3)
      const transformedResponse = {};
      response3.forEach((item: any) => {
        transformedResponse[item[0]] = item[1];
      });

      console.log(transformedResponse);
      this.chartOptionsBar.series = [{
        data: Object.values(transformedResponse)
      }];

      this.chartOptionsBar.xaxis = {
        categories: Object.keys(transformedResponse)
      };

      this.chartOptions.series = Object.values(transformedResponse);
      this.chartOptions.labels = Object.keys(transformedResponse);
    });

    this.recServices.getReclamations().subscribe(
      data => {
        console.log("res", data);
        this.listRec = data;
      }
    );
  }

  updaterec(idReclamation: any) {
    this.recServices.updateReclamation(this.reclamation, idReclamation).subscribe(data => {
      console.log(data);
      this.dialog.closeAll();
      this.refreshData(); // Call the refreshData method after updating the record
    });
  }








  AddRec(): void {
    if (this.descriptionFormControl.valid && this.reclamation.dateRec && this.reclamation.typeRec) {
      this.recServices.createReclamation(this.reclamation, 1)
        .subscribe(response => {
          console.log(response);
          this.recServices.getReclamations().subscribe(
            res => {
              console.log("res", res);
              this.listRec = res;
            }
          );
        });
    } else {
      console.log("Form is not fully filled. Please fill all the required fields.");
    }
  }

  deleteReclamation(id: number){
    this.recServices.deleteReclamation(id).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    })
  }


  openDialog(templateRef, rec: Reclamation) {
    this.reclamation = { ...rec };

    const dialogRef = this.dialog.open(templateRef, {
      width: '800px',
      data: this.reclamation
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getByArchivedTrue(){
    this.recServices.getByArchivedTrue().subscribe(
      data => {
        console.log("res", data);
        this.listRec = data;
      }
    );
  }
  getReclamations(){
    this.recServices.getReclamations().subscribe(
      data => {
        console.log("res", data);
        this.listRec = data;
      }
    );
  }
  archiveReclamationResolu(id:number){
    console.log("cron")
    this.recServices.archiveReclamationResolu(id)
  }

}
