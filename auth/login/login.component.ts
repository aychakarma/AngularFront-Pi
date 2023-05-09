import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  


  loginForm: FormGroup

  constructor(private http: HttpClient, private router: Router,
  private userAuthService:UserAuthService,public userService:UserService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }


  login() {
    console.log(this.loginForm.invalid);
    if (this.loginForm.invalid) {
      alert('Enter a valid credentials');
      return;
    }
    this.userService.login(this.loginForm.value).subscribe({
      next: (response:any) => {
        // Store the access token and refresh token in the local storage
        this.userAuthService.setRoles(response.userDetails.role);
        this.userAuthService.setToken(response.token);
        if (this.userService.roleMatch(['admin'])) {
          // Redirect to /dashboard if the user's role is admin
          this.router.navigate(['/dashboard']);
        } else {
          // Redirect to the dashboard profile page for non-admin users
          this.router.navigate(['/doc/components']);
        }
      },
      error: error => {
        console.error(error);
        alert('Username or password is invalid');
      }
    });
  }
  
  }


