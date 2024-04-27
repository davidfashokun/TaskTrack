import { Component, Inject } from '@angular/core';
import { Todolist } from '../model/todolist';
import { AuthSvcService } from '../services/auth-svc.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfo } from '../model/user-info';

@Component({
  selector: 'app-todo-list-dialog',
  templateUrl: './todo-list-dialog.component.html',
  styleUrl: './todo-list-dialog.component.css'
})
export class TodoListDialogComponent {
  myLists: Todolist[]=[];
  list:Todolist;
  task: string = '';
  due_date:string='';
  currentUser:UserInfo|null=null;
  //myLists: Todolist|undefined;

  constructor(private authSvc: AuthSvcService, public dialogRef: MatDialogRef<TodoListDialogComponent>,private snackbar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { list: Todolist, userLists: Todolist[]} ) {
      this.list = data.list;
    this.myLists = data.userLists;
  }
  // async ngOnInit(){
  //   if(this.authSvc.UserLoggedIn || this.currentUser){
  //     let list = await this.authSvc.getMyLists()
  //     // this.todoLists = this.authSvc.GetTodoLists()
  //     // console.log(lists);
  //     if (list)
  //       this.myLists = list
  //   }
  // }

  // addItem(list_id:number,itemTask:string,taskDue:string){
    addItem(list_id:number,itemTask:string,taskDue:string){
    if(this.authSvc.UserLoggedIn){
      this.authSvc.addNewItem(list_id, itemTask, taskDue)
      .then(result => {
        if (result) {
          // Item added successfully
          // You can update the local list_items array if needed
          const list = this.myLists.find(l => l.id === list_id);
          if (list) {
            list.list_items.push(result);
          }
        } else {
          this.snackbar.open('Error adding new item', 'Close');
        }
      })
      .catch(error => {
        this.snackbar.open(`Error adding new item: ${error}`, 'Close');
      });
  } else {
    this.snackbar.open('You are not logged in', 'Close');
  }
}

  deleteItem(item: any) {
    // Implement logic to delete an item from the list
    // You can call a service method to update the list on the server
  }

  editList() {
    // Implement logic to edit the list title or other properties
    // You can call a service method to update the list on the server
  }
}