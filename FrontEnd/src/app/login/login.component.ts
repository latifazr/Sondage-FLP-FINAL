import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { FormGroup, FormControl , Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(public appService: ServiceService,private router: Router ) {

    this.loginForm = new FormGroup({
         email: new FormControl(''),
         password: new FormControl(''),
    });
  }

  ngOnInit() {
  }

  login(){
    this.appService.login(this.loginForm.value).subscribe((data3: any) => {
      localStorage.setItem('token', data3.access_token);
     data3.access_token = this.appService.getDecodedToken();   
      this.router.navigate(['home']);
     });
  }
}
