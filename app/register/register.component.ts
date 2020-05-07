import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    form: FormGroup;
    errorMsg: string = '';
    errorOccured: boolean = false;
    //aadharNo: number;

    constructor(private _authService: AuthService,
      private router: Router,
      private http: HttpClient){}
  
    ngOnInit(){
      this.form = new FormGroup({
        aadhaar: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(12), Validators.maxLength(12)]),
        name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
        birth: new FormControl(''),
        occupation: new FormControl(''),
        address: new FormControl('', Validators.required),
        place: new FormControl('', Validators.required),
        district: new FormControl('', Validators.required),
        contact: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]),
        sex: new FormControl('', Validators.required),
        marital: new FormControl('', Validators.required)
      });
    }


    registerurl = 'http://localhost:3000/register';
    userToken: any;

    addUser(){
      this.http.post(this.registerurl,this.form.value)
          .subscribe(
            data =>{
              console.log(data);
              localStorage.setItem('currentUser',JSON.stringify(data));
              this.userToken = JSON.parse(localStorage.getItem('currentUser'));
              console.log(this.userToken.token);
              this.router.navigate(['/setPassword',this.form.value.aadhaar]);
            },
            error => {
              this.errorMsg = error.statusText;
              this.errorOccured = !this.errorOccured;
              this.form.reset();
            }
          )  
    }

  }