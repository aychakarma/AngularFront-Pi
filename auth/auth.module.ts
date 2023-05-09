import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordRestComponent } from './password-rest/password-rest.component';
import { RestFormComponent } from './rest-form/rest-form.component';



@NgModule({
  declarations: [LoginComponent, SignupComponent, PasswordRestComponent, RestFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class AuthModule { }
