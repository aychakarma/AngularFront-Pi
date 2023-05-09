import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'll-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isLessThenLargeDevice;

  user:any;
  constructor(private breakpointObserver: BreakpointObserver, private router: Router, 
    public userAuthService:UserAuthService, public userService :UserService) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });

    this.profile();
  }
  onLogout(): void {
    this.userAuthService.clear();
    this.router.navigate(['auth/login']);
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  profile() {
    this.userService.getProfile()
    .subscribe(users => {
      this.user= users;
      console.log(typeof users);
    }); 

}
}