import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import { ConfirmEqualValidatorDirective } from '../confirm-equal-validator.directive';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  form: FormGroup;
  aadhaarNo: number;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) { }


  ngOnInit(){
    this.aadhaarNo = +this.route.snapshot.paramMap.get('id');
    this.form = new FormGroup({
      aadhar: new FormControl({value: this.aadhaarNo, disabled: true},[Validators.required]),
      password : new FormControl('', [Validators.required,Validators.minLength(6)]),
      confirmPassword : new FormControl('', [Validators.required,Validators.minLength(6)])
    });
  }

  initialiseFormGroup(pass: any){
    return new FormGroup({
      password : new FormControl(pass,[Validators.required])
    });
  }

  setPasswordUrl = 'http://localhost:3000/setPassword/';

  onSetPassword(){
    
    if(this.form.value.password === this.form.value.confirmPassword){
      let newForm: FormGroup = this.initialiseFormGroup(this.form.value.password);
      console.log(newForm.value);
      this.http.post(this.setPasswordUrl + 'this.aadhaarNo', newForm.value)
          .subscribe(
            data => {
              console.log(data);
            },
            error =>{
              console.log(error);
            }
          )     
    }
    else{
      return;
    }

  }

}
