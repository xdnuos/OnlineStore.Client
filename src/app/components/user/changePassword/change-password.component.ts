import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { AuthService } from '../../../services/auth.service';
import { ChangePassword } from '../../../store/model/User.model';
import { ModalData } from '../../productDetail/product-detail.component';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  public data = inject<ModalData>(NZ_MODAL_DATA);
  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private fb: NonNullableFormBuilder,
    private authService: AuthService
  ) {}

  confirmationValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  validateForm: FormGroup<{
    oldPassword: FormControl<string>;
    newPassword: FormControl<string>;
    rePassword: FormControl<string>;
  }> = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    rePassword: ['', [Validators.required, this.confirmationValidator]],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      const req: ChangePassword = {
        oldPassword: this.validateForm.controls.oldPassword.value,
        newPassword: this.validateForm.controls.newPassword.value,
      };
      this.authService.changePassword(req).subscribe(
        (res: any) => {
          this.message.success(res.message);
          this.modal.destroy();
        },
        (error: any) => {
          this.message.error(error.error?.Message || 'An error occurred');
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
