import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import CustomValidator from 'src/app/model/custom-validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registrationForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    validatePassword: new FormControl('')
  });
  submitted = false;
  
  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
  }
  
  ngOnInit(): void{
    this.registrationForm = this.formBuilder.group({
      email:['',
        Validators.required,
        Validators.email
      ],
      password:['',
        Validators.required
      ],
      validatePassword:['',
        Validators.required
      ]},
      {validator: CustomValidator.MatchValidator('password', 'validatePassword')}
    );
  }
  
  get forms(): { [key: string]: AbstractControl} {
    return this.registrationForm.controls;
  }
  
  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    this.userService.registerUser(this.registrationForm.value.email, this.registrationForm.value.password)
      .subscribe((i) => {console.log(i);
      alert("You are registered!");
      this.router.navigate(['user/login']);},
        (error) => {console.log(error);
      alert("This email is already registeres");
      })
  }
  
  onReset(): void{
    this.submitted = false;
    this.registrationForm.reset();
  }
}

  
