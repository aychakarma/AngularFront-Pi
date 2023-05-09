import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import {HttpClient} from "@angular/common/http";
import {WeatherInfo} from "./WeatherInfo";
import {ApiService} from '../doc-credits/ApiService';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {Observable} from "rxjs";

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Lieblings',
    children: [
      {
        name: 'src',
        children: [
          {
            name: 'e2e',
            children: [
              {
                name: 'tsconfig.json'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }]
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }]
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }]
      }
    ]
  }
];
/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'll-doc-folder-structure',
  templateUrl: './doc-folder-structure.component.html',
  styleUrls: ['./doc-folder-structure.component.scss', './weathercss.css','./quoate.css']
})

export class DocFolderStructureComponent implements OnInit {
  weatherInfo: WeatherInfo = new WeatherInfo();

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  tips: any[];

  constructor(private apiService: ApiService,private http: HttpClient,public dialog: MatDialog) {
    this.dataSource.data = TREE_DATA;

  }

  ngOnInit(): void {

    this.apiService.getWeatherInfo().subscribe(response => {
      this.weatherInfo = response;
      if (this.weatherInfo.rainProbability > 0.06) {
        console.log('Check your mail !!');
      }
    })
      this.apiService.getTips().subscribe(
        tip => {
          console.log("ena west getTips");
          console.log(tip);
          this.tips.push(tip);
        }
      );
    }















  }
