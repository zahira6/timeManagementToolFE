import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit{
  
  constructor(private userService: UserService, private router: Router) {
  }
  
  ngOnInit(): void {
    this.userService.logoutUser()
    alert("You are successfully logged out");
    this.router.navigate(['user/login'])
  }

}
