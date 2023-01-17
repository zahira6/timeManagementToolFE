import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  submitted = false;

    constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    }
    ngOnInit(): void{
      this.loginForm = this.formBuilder.group({
        email: ['',
          Validators.required,
          Validators.email
        ],
        password: ['',
          Validators.required,
        ],
      });
    }

    get forms(): {[key: string]: AbstractControl}{
      return this.loginForm.controls;
}

    onSubmit(): void{
      this.submitted = true
      if (this.loginForm.invalid){
        return;
      }
      this.userService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (i) => {console.log(i);
        alert("You are logged in");
        this.router.navigate(['user/register']);
        }, (error) => {console.log(error);
        alert("Wrong email or password");
        }
      )
    }

    onReset(): void {
      this.submitted = false;
      this.loginForm.reset();
    }
}
