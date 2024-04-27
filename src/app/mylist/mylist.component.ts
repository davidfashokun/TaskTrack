import { Component } from '@angular/core';
import { AuthSvcService } from '../services/auth-svc.service';
import { MatDialog } from '@angular/material/dialog';
import { UserInfo } from '../model/user-info';
import { Todolist } from '../model/todolist';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoListDialogComponent } from '../todo-list-dialog/todo-list-dialog.component';

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
    //this.todoLists = this.authSvc.currentTodoList
  // this.loggedIn = this.authSvc.activeLogin

  //IF THIS IS THE CURRENT USER, LOGGED IN USER, SHOW MY LISTS.
  try {
  if(this.authSvc.UserLoggedIn){
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

  deleteList(){
    console.log("You want to delete this list")
  }
  addItemListById(list_id: number) {
    const list = this.myLists.find(l => l.id === list_id);
    if (list) {
      const dialogRef = this.dialog.open(TodoListDialogComponent, {
        data: { list }
      });
    }
  }
  //  addItem(list_id:number,itemtask:string,taskDue:string){
  //   if(this.authSvc.UserLoggedIn){
  //     this.authSvc.addNewItem(list_id,this.task,this.due_date)
  //   }
  //   else {
  //     this.snackbar.open('You are not logged in','Close')
  //   }
  // }
  getListById(list_id:number) {
    console.log("You want to view this list")
  }
  openNewItemDialog(): void {
    this.dialog.open(TodoListDialogComponent, {
      width: '300px',
    });
  }
}
