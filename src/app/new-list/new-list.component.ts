import { Component } from '@angular/core';
import { AuthSvcService } from '../services/auth-svc.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.css'
})
export class NewListComponent {

  title:string='';
  isPublic=true;
  titleInputFilled: boolean = false;

  constructor(private authSvc:AuthSvcService, private dialog:MatDialog){

  }
  AddNewTodoList(title: string, isPublic: boolean): void {
    this.authSvc.AddNewList(title, isPublic)
  }
}
