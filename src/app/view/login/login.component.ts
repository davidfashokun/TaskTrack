import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthSvcService } from '../../services/auth-svc.service';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;
  errorMessage = '';
  email = ''
  password =''

  constructor(private formBuilder: FormBuilder, private authService: AuthSvcService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params=>{
      this.email=params['email'];
    });
  }
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    pwdFormControl = new FormControl('',Validators.required);
  async LoginUser()
  { 
    if (!this.emailFormControl.invalid && !this.pwdFormControl.invalid)
    {   
      let userData = await this.authService.LoginUser(this.emailFormControl.value as string,this.pwdFormControl.value as string);
      if(userData!=null)
      {
        console.log(userData);
        alert('Login successful!');
      }
    }
  }
}
