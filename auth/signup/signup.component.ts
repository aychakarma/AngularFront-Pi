import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'll-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user:User = new User() ;

  registerForm:any;

  username: any;

  

  constructor(private userService:UserService, private router:Router ) { }

  ngOnInit(): void {
  }

  

  onSubmit(registerForm: NgForm) {
    this.userService.register(registerForm.value).subscribe({
      next: (response) => {
        
        console.log(response);
        alert('Registration successful'); 
        console.log('register successful')

        // Redirect to the login page
        this.router.navigate(['/auth/login']);
      },
      error: error => {
        console.error(error);
        console.log("failed")
      }
    });
}
}
