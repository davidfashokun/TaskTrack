import { Component, EventEmitter, ViewChild } from '@angular/core';
import { RegisterComponent } from '../view/register/register.component';
import { AuthSvcService } from '../services/auth-svc.service';
import { UserInfo } from '../model/user-info';
import { MatSidenav } from '@angular/material/sidenav';
import { LogoutComponent } from '../view/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  loggedInUserName:UserInfo|null = null;
  userLoggedIn=false;
  
  constructor(private authSvc:AuthSvcService, private dialog: MatDialog, private router:Router) {
    this.authSvc.UserLoggedIn.subscribe(()=>{
      this.authSvc.GetCurrentUser().then((data:UserInfo|null)=>{
        this.loggedInUserName = data;
      });

      this.authSvc.activeLogin.subscribe((loggedIn)=>{
        this.userLoggedIn = loggedIn;
      })
    });
  }
  openLogoutDialog(): void {
    this.dialog.open(LogoutComponent, {
      width: '300px',
    });
  }
}
