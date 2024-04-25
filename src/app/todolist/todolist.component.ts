import { Component, OnInit } from '@angular/core';
import { AuthSvcService } from '../services/auth-svc.service';
import { UserInfo } from '../model/user-info';
import { Todolist } from '../model/todolist';
import { NewItemComponent } from '../new-item/new-item.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent implements OnInit{
  
  currentUser : UserInfo | null = null;
  todoLists : Todolist | null = null;
  loggedIn:string='';

  constructor(private authSvc:AuthSvcService, private dialog:MatDialog){

  }
  
  async ngOnInit(): Promise<void> {
    let currentUser = this.authSvc.GetCurrentUser();
    //this.todoLists = this.authSvc.currentTodoList

    let lists = await this.authSvc.GetTodoLists()
    console.log(lists);
  }
  
  addItem() {
    if (!this.todoLists) return; // Handle case where todoLists is not defined
    
    const dialogRef = this.dialog.open(NewItemComponent, {
      data: {
        list: this.todoLists.title,
        list_id: this.todoLists.id,
      }
    });
  }  

}
