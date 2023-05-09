import { Component, OnInit } from '@angular/core';
import { EquipeService } from 'src/app/equipe.service';
import { KeyValuePair } from 'src/app/equipe.service';



@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.scss']
})
export class DashboardOrderComponent implements OnInit {
  visible: boolean;

    position: string;

  testStats: KeyValuePair[] = [];
  groupedStats: any = {};

  constructor(private equipeService: EquipeService) {}

  ngOnInit() {
    this.equipeService.getTestStatData().subscribe(data => {
      this.testStats = data;
      console.log(this.testStats)
      this.groupedStats = this.groupBy(data, "0")


    });
  }


  groupBy(xs: any[], key: string) {
    return xs.reduce((rv, x) => {
      const val = x[key];
      (rv[val] = rv[val] || []).push(x);
      return rv;
    }, {});
  }

  showDetails(username: string) {
    this.equipeService.countEquipesByUser().subscribe(data => {
      const userEquipeCount = data.find(d => d[0] === username);
      if (userEquipeCount) {
        alert(`The user ${username} has ${userEquipeCount[1]} teams.`);
      } else {
        alert(`The user ${username} has no teams.`);
      }
    });
  }
  showDialog(position: string) {
    this.position = position;
    this.visible = true;
}
}
