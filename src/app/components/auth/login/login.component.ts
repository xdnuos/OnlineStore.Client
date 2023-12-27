import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take } from 'rxjs';
import {
  login,
  loginFail,
  loginSuccess,
} from '../../../store/auth/Auth.action';
import { LoginUser } from '../../../store/model/User.model';
@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [true],
  });
  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      const user: LoginUser = {
        email: this.validateForm.value.email,
        password: this.validateForm.value.password,
      };

      // Dispatch the login action
      this.store.dispatch(login({ req: user }));
      const loginSuccessAction = this.action.pipe(ofType(loginSuccess));
      loginSuccessAction.pipe(take(1)).subscribe(
        () => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error during login:', error);
          this.message.error('Login failed');
        }
      );

      const loginFailAction = this.action.pipe(ofType(loginFail));
      loginFailAction.pipe(take(1)).subscribe(() => {
        this.message.error('Login failed');
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store,
    private router: Router,
    private message: NzMessageService,
    private action: Actions
  ) {}
}
