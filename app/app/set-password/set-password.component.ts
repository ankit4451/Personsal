import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import { ConfirmEqualValidatorDirective } from '../confirm-equal-validator.directive';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit(){
    this.form = new FormGroup({
      aadhar: new FormControl('',[Validators.required , Validators.pattern('^\\d{4}\\s\\d{4}\\s\\d{4}$')]),
      password : new FormControl('', [Validators.required,Validators.minLength(6)]),
      confirmPassword : new FormControl('', [Validators.required,Validators.minLength(6)])
    });
  }

  onSetPassword(){
    console.log(this.form.value);
  }

}
