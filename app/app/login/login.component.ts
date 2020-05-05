import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private _authService: AuthService,
    private router: Router) { }

  ngOnInit(){
    this.form = new FormGroup({
      aadhar: new FormControl('',[Validators.required , Validators.pattern('^\\d{4}\\s\\d{4}\\s\\d{4}$')]),
      password : new FormControl('', [Validators.required,Validators.minLength(6)])
    });
  }

  logUser(){
    this._authService.login(this.form.value)
        .subscribe(
          res=> {
            console.log(res);
            localStorage.setItem('token',res.token);
            this.router.navigate(['/home']);

          },
          err=> {
            console.log(err);
          }
        )
  }

}
