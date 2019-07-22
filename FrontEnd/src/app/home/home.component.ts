import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public show_new: boolean = false;
  public show_my: boolean = false;
  public show_all: boolean = false;

  allSujets: any;
  mySujets:any;
  id_user: any;
  newaddSubjectForm: FormGroup;

  constructor(private http: ServiceService, private router: Router, private route: Router) { 
    this.id_user = this.http.connectedUser.data.user;


    this.newaddSubjectForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      });
  }

  ngOnInit() {
    this.http.getAllSujet().subscribe(data => {
      this.allSujets = data;
      console.log(data);
    });

    this.http.getmySujet(this.id_user).subscribe(data1 => {
      this.mySujets = data1;
      console.log(data1);
    });

  }

  newS() {
    this.show_new = !this.show_new;
    this.show_my =  false;
    this.show_all = false;
  }

  myS() {
    this.show_my = !this.show_my;
    this.show_new = false;
    this.show_all = false;
  }

  allS() {
    this.show_all = !this.show_all;
    this.show_my =  false;
    this.show_new = false;
  }

  addnewSubject(){
    const dataForm = new FormData();
    dataForm.append('titre', this.newaddSubjectForm.value.titre);
    dataForm.append('description', this.newaddSubjectForm.value.description);

    this.http.postAddSujet(dataForm).subscribe((data3: any) => {
      console.log(data3);
    });

  }
}
