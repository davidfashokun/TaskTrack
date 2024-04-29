import { Component, OnInit } from '@angular/core';
import { AuthSvcService } from '../services/auth-svc.service';
import { UserInfo } from '../model/user-info';
import { Todolist } from '../model/todolist';
import { MatDialog } from '@angular/material/dialog';
import { TodoListDialogComponent } from '../newlistdialog/newlistdialog.component';

@Component({
  selector: 'app-publiclist',
  templateUrl: './publiclist.component.html',
  styleUrl: './publiclist.component.css'
})
export class TodolistComponent implements OnInit{
  
  currentUser : UserInfo | null = null;
  todoLists : Todolist[]=[];
  // loggedIn: any;

  constructor(private authSvc:AuthSvcService, private dialog:MatDialog){

  }
  async ngOnInit(): Promise<void> {
    let lists = await this.authSvc.getPublicLists()
    console.log(lists);
    if (lists)
      this.todoLists = lists
  }
  
  getListById(list_id: number) {
    if (!this.authSvc.UserLoggedIn) {
    const list = this.todoLists.find(l => l.id === list_id);
    if (list) {
      const dialogRef = this.dialog.open(TodoListDialogComponent, {
        data: { list }
      });
    }
  }
  }
}
