import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  singupForm: FormGroup;
  constructor(public appService: ServiceService) { 
    this.singupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])

      });
  }

  ngOnInit() {
  }

  signup() {
    const dataForm = new FormData();
    dataForm.append('name', this.singupForm.value.name);
    dataForm.append('email', this.singupForm.value.email);
    dataForm.append('password', this.singupForm.value.password);

    this.appService.register(dataForm).subscribe((data2: any) => {
      console.log(data2);
    });
  }

}
