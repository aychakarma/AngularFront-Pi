import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-password-rest',
  templateUrl: './password-rest.component.html',
  styleUrls: ['./password-rest.component.scss']
})
export class PasswordRestComponent {

  passwordResetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  isResetRequested: boolean = false;
  isResetting: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService,private router: Router) {
    this.passwordResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.isResetRequested = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.userService.requestPasswordReset(this.passwordResetForm.value.email)
      .subscribe(
        (result) => {
          // Redirect to PasswordResetFormComponent with the token parameter
          this.router.navigate(['/auth/reset-form'], { queryParams: { token: result.token } });
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
  }

  resetPassword(newPassword: string, token: string) {
    this.isResetting = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.userService.resetPassword(newPassword, token)
      .subscribe(
        (result) => {
          this.successMessage = result.message;
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
  }
}
