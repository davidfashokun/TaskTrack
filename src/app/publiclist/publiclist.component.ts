import { Component, OnInit } from '@angular/core';
import { AuthSvcService } from '../services/auth-svc.service';
import { UserInfo } from '../model/user-info';
import { Todolist } from '../model/todolist';
import { NewItemComponent } from '../new-item/new-item.component';
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
  //TRY TO IMPLEMENT LOGIC THAT IF USER IS LOGGED IN THEIR LISTS IS REMOVED IN PUBLIC LIST PAGE AND IS IN THEIR PRIVATE
  async ngOnInit(): Promise<void> {
  // this.currentUser = this.authSvc.currentUser;
    //this.todoLists = this.authSvc.currentTodoList
  // this.loggedIn = this.authSvc.activeLogin
  // if(this.authSvc.UserLoggedIn || this.currentUser){
    let lists = await this.authSvc.getPublicLists()
    // this.todoLists = this.authSvc.GetTodoLists()
    console.log(lists);
    if (lists)
      this.todoLists = lists
  // }
  }
  
  // addItem() {
  //   // if (this.authSvc.UserLoggedIn) {
  //   if (!this.todoLists) return; // Handle case where todoLists is not defined
    
  //   const dialogRef = this.dialog.open(NewItemComponent, {
  //     data: {
  //       list: this.todoLists[0]?.title,
  //       list_id: this.todoLists[0]?.id,
  //     }
  //   });
  // // }
  // } 
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

  deleteList(){
    console.log("You want to delete this list")
  }

}
