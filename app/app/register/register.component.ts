import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    form: FormGroup;
    errorMsg: string = '';
    errorOccured: boolean = false;

    constructor(private _authService: AuthService,
      private router: Router){}
  
    ngOnInit(){
      this.form = new FormGroup({
        aadhar: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}\\s\\d{4}\\s\\d{4}$')]),
        name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
        birth: new FormControl(''),
        occupation: new FormControl(''),
        address: new FormControl('', Validators.required),
        place: new FormControl('', Validators.required),
        district: new FormControl('', Validators.required),
        contact: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]),
        sex: new FormControl('', Validators.required),
        maritial: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password : new FormControl('', [Validators.required,Validators.minLength(6)])
      });
    }

    addUser(){
      
      this._authService.register(this.form.value)
          .subscribe(
            data =>{
              console.log('Sucess!', data);
              this.router.navigate(['/login']);
            },
            error => {
              this.errorMsg = error.statusText;
              this.errorOccured = !this.errorOccured;
              this.form.reset();
            }
          )
      
    }

  }