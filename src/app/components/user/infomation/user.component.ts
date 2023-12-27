import { Component } from '@angular/core';

@Component({
  selector: 'app-user-infomation',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserInfoComponent {
  user = {
    userID: 1013,
    firstName: 'Hoang',
    lastName: 'Hung',
    phoneNumber: '0865307743',
    email: 'admin@gmail.com',
    dateOfBirth: '2001-11-21T00:00:00',
    civilianId: null,
  };
}
