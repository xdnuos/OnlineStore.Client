import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChangePasswordComponent } from '../../components/user/changePassword/change-password.component';
import { logout } from '../../store/auth/Auth.action';
import { User } from '../../store/model/User.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public user: User | null = null;

  constructor(private store: Store, private modalService: NzModalService) {}
  ngOnInit(): void {
    const jsonString = localStorage.getItem('user') || '';
    if (jsonString) {
      this.user = JSON.parse(jsonString);
    }
  }
  logout() {
    this.store.dispatch(logout());
    this.user = null;
  }
  changePassword() {
    this.modalService.create({
      nzTitle: '',
      nzContent: ChangePasswordComponent,
      nzWidth: 400,
      nzFooter: null,
      nzCloseIcon: '',
    });
  }
}
