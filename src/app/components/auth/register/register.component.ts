import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take } from 'rxjs';
import { register, registerSuccess } from '../../../store/auth/Auth.action';
import { RegisterUser } from '../../../store/model/User.model';
@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  confirmationValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  validateForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    rePassword: FormControl<string>;
    agree: FormControl<boolean>;
  }> = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z0-9_-\\s]*'),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z0-9_-\\s]*'),
      ],
    ],
    email: ['', [Validators.email]],
    rePassword: ['', [Validators.required, this.confirmationValidator]],
    password: ['', [Validators.required]],
    agree: [true, [Validators.requiredTrue]],
  });

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      const user: RegisterUser = {
        email: this.validateForm.value.email,
        password: this.validateForm.value.password,
        firstName: this.validateForm.value.firstName,
        lastName: this.validateForm.value.lastName,
      };

      // Dispatch the login action
      this.store.dispatch(register({ req: user }));
      const registerSuccessAction = this.action.pipe(ofType(registerSuccess));
      registerSuccessAction.pipe(take(1)).subscribe(
        () => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error during register:', error);
          this.message.error('An error occured. Please try again.');
        }
      );

      // this.action
      //   .pipe(ofType(registerFail))
      //   .pipe(take(1))
      //   .subscribe((message) => {
      //     this.message.error(
      //       message.errorMessage ?? 'An error occured. Please try again.'
      //     );
      //   });
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
