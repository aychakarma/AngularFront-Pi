import { Component } from '@angular/core';
import { EquipeService } from './equipe.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'll-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit{
  equipe: Object

  constructor() {

  }
  ngOnInit(): void {
    
  }
}
