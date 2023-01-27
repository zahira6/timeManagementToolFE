import { Component } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timeManagementToolFE';

  constructor(private userService: UserService){}

  userIsLoggedIn(): boolean {
    if(this.userService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }
}
