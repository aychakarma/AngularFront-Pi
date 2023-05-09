import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-rest-form',
  templateUrl: './rest-form.component.html',
  styleUrls: ['./rest-form.component.scss']
})
export class RestFormComponent {
  resetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  isResetting: boolean = false;
  token: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.matchingPasswords('password', 'confirmPassword')
    });
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    this.isResetting = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.userService.resetPassword(this.resetForm.value.password, this.token)
      .subscribe(
        (result) => {
          this.successMessage = result.message;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000); // navigate to login after 2 seconds
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.isResetting = false;
        }
      );
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({notMatching: true});
      }
    };
  }
}
