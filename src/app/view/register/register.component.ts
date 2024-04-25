import { Component } from '@angular/core';
import { AuthSvcService } from '../../services/auth-svc.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authSvc:AuthSvcService, private router:Router){
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  pwdFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  errorMessage:string = '';

  async CreateNewUser()
  {
    if(!this.emailFormControl.invalid && !this.pwdFormControl.invalid && !this.nameFormControl.invalid)
    {
      let newUser = await this.authSvc.CreateUser(this.emailFormControl.value as string, this.pwdFormControl.value as string, this.nameFormControl.value as string)
      if(newUser)
      {
        this.errorMessage='User created!';
        this.router.navigate(['/login',{email:this.emailFormControl.value}]);
      }
      else
      {
        this.errorMessage='User creation failed!';
      }
    }
    else
    {
      this.errorMessage='Please fill out all fields!';
    }
    
  }
}
