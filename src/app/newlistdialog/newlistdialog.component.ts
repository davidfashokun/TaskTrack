import { Component, Inject, Input } from '@angular/core';
import { Todolist } from '../model/todolist';
import { AuthSvcService } from '../services/auth-svc.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfo } from '../model/user-info';

@Component({
  selector: 'app-newlistdialog',
  templateUrl: './newlistdialog.component.html',
  styleUrl: './newlistdialog.component.css'
})
export class TodoListDialogComponent {
  myLists: Todolist[]=[];
  // listId:number
  @Input() list_id: number=0;
  task: string = '';
  due_date:Date|null=null;
  currentUser:UserInfo|null=null;
  taskInputFilled: boolean = false;
  //myLists: Todolist|undefined;

  constructor(private authSvc: AuthSvcService, public dialogRef: MatDialogRef<TodoListDialogComponent>,private snackbar:MatSnackBar,
    ){
      console.log('Received listId from inject this.listid:', this.list_id);
  }

    addItem(){
    if(this.authSvc.UserLoggedIn){
    //   const selectedList = this.myLists.find(list => list.id === this.listId);
    // if (selectedList) {
      const newItem = {
        task: this.task,
        due_date: this.due_date?.toISOString() || null
      };
      this.authSvc.addNewItem(this.list_id, newItem)
      .then(result => {
        if (result) {
          this.snackbar.open('Item added successfully', 'Close', { duration: 3000 });
          this.dialogRef.close();
          // const list = this.myLists.find(l => l.id === list_id);
          // if (list) {
          //   list.list_items.push(result);
          // }
        } else {
          this.snackbar.open('Error adding new item', 'Close');
        }
      })
      .catch(error => {
        this.snackbar.open(`Error adding new item: ${error}`, 'Close');
      });
    // else {
    //   this.snackbar.open('List not found', 'Close');
    // }
  } else {
    this.snackbar.open('You are not logged in', 'Close');
  }
}

  deleteItem(list_id: any) {
    // Implement logic to delete an item from the list
  }

  editList() {
    // Implement logic to edit the list title or other properties
  }
}