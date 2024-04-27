import { Component } from '@angular/core';
import { AuthSvcService } from '../services/auth-svc.service';
import { MatDialog } from '@angular/material/dialog';
import { UserInfo } from '../model/user-info';
import { Todolist } from '../model/todolist';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoListDialogComponent } from '../newlistdialog/newlistdialog.component';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrl: './mylist.component.css'
})
export class MylistComponent {

  currentUser : UserInfo | null = null;
  myLists : Todolist[]=[];
  task:string='';
  due_date='';
  // loggedIn: any;

  constructor(private authSvc:AuthSvcService, private dialog:MatDialog, private snackbar: MatSnackBar){

  }
  
  async ngOnInit(): Promise<void> {

   this.currentUser = await this.authSvc.GetCurrentUser();

  try {
  if(this.authSvc.UserLoggedIn && this.currentUser){
    let lists = await this.authSvc.getMyLists()
    // this.todoLists = this.authSvc.GetTodoLists()
    console.log(lists);
    if (lists)
      this.myLists = lists
  }
} catch (err:any) {
    this.snackbar.open(`Error getting todoLists ${err.error.status}-${err.error.message}`,'Close',{verticalPosition:'bottom', duration:3000});
  }
  }

  deleteList(listId: number) {
    if (this.authSvc.UserLoggedIn) {
      const selectedList = this.myLists.find(list => list.id === listId);
      if (selectedList) {
        this.authSvc.deleteToDoList(selectedList)
          .then(() => {
            this.myLists = this.myLists.filter(list => list.id !== listId);
            this.snackbar.open('List deleted successfully', 'Close', { duration: 3000 });
          })
          .catch(error => {
            this.snackbar.open(`Error deleting list: ${error}`, 'Close', { duration: 3000 });
          });
      } else {
        this.snackbar.open('List not found', 'Close', { duration: 3000 });
      }
    } else {
      this.snackbar.open('You must be logged in to delete a list', 'Close', { duration: 3000 });
    }
  }
  openNewItemDialog(list_id: number) {
    const listFound = this.myLists.find(l => l.id === list_id);
    if (listFound) {
      console.log('Received listId from mylist:', list_id);
      const dialogRef = this.dialog.open(TodoListDialogComponent, {
        width:'300px',
        data: { list_id }
      
      });
      //USED THE HELP OF CLAUDE.AI FOR THIS
      dialogRef.componentInstance.list_id = list_id;
    } else {
      this.snackbar.open('List not found','Close');
    }
  }

  getListById(list_id:number) {
    console.log("You want to view this list")
  }
}
