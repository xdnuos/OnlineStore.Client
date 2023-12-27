import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
function passwordMatchValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const rePassword = control.get('rePassword');

  if (password && rePassword && password.value !== rePassword.value) {
    return { passwordMismatch: true };
  }

  return null;
}
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthPage {
  selectedTabIndex: number = 1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const isLoginPage = this.route.snapshot.url[0].path === 'login';

    this.selectedTabIndex = isLoginPage ? 1 : 0;
  }
}
