import { Component } from '@angular/core';
import { AuthSvcService } from '../services/auth-svc.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.css'
})
export class NewListComponent {

  constructor(private authSvc:AuthSvcService){

  }
  AddNewTodoList(title: string, isPublic: boolean): void {
    this.authSvc.AddNewList(title, isPublic)
  }
}
