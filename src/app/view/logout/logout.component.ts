import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthSvcService } from '../../services/auth-svc.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  
  constructor(public authSvc: AuthSvcService) {
  }

  logUserOut () {
      this.authSvc.logout()
    }
}
