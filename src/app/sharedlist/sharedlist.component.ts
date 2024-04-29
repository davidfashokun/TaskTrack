import { Component } from '@angular/core';
import { UserInfo } from '../model/user-info';
import { AuthSvcService } from '../services/auth-svc.service';
import { Todolist } from '../model/todolist';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TodoListDialogComponent } from '../newlistdialog/newlistdialog.component';

@Component({
  selector: 'app-sharedlist',
  templateUrl: './sharedlist.component.html',
  styleUrl: './sharedlist.component.css'
})
export class SharedlistComponent {

  currentUser : UserInfo | null = null;
  lists : Todolist[]=[];

  constructor(private authSvc:AuthSvcService, private snackbar: MatSnackBar,private dialog:MatDialog){

  }

  async ngOnInit(): Promise<void> {

    this.currentUser = await this.authSvc.GetCurrentUser();

   try {
   if(this.authSvc.currentUser){
     let sharedLists = await this.authSvc.getSharedLists()
     if (sharedLists)
       this.lists = sharedLists
   }
 } catch (err:any) {
      console.log(err)
     this.snackbar.open('Error getting todoLists','Close',{verticalPosition:'bottom', duration:3000});
   }
   }

   openNewItemDialog(list_id: number) {
    const listFound = this.lists.find(l => l.id === list_id);
    if (listFound) {
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
  deleteSharedList(listId: number) {
    if (!this.authSvc.currentUser || !this.authSvc.UserLoggedIn) {
      this.snackbar.open('You must be an owner to delete a list', 'Close', { duration: 3000 });
      return;
    }
  
    const selectedList = this.lists.find(list => list.id === listId);

    if (!selectedList) {
      this.snackbar.open('List not found', 'Close', { duration: 3000 });
      return;
    }

    // if (!this.isListSharedWithUser(selectedList)) {
    //   this.snackbar.open('You do not have permission to delete this list', 'Close', { duration: 3000 });
    //   return;
    // }
    console.log(selectedList.list_items)
    // if (selectedList.shared_with.find(user=>user.email==this.currentUser?.email)?.email == this.currentUser?.email) {
    this.authSvc.deleteSharedToDoList(selectedList,this.currentUser?.email)
    .then(() => {
    this.lists = this.lists.filter(list => list.id !== listId);
    this.snackbar.open('List deleted successfully', 'Close', { duration: 3000 });
    })
    .catch(error => {
    this.snackbar.open(`Error deleting list: ${error}`, 'Close', { duration: 3000 });
    });
  //   }
  // else {
  //   this.snackbar.open('Not Authorized','Close', {duration:3000})
  // }
  }
  // isListSharedWithUser(list: Todolist): boolean {
  //   return !!list.shared_with.some(shareUser => shareUser.email === this.currentUser?.email);
  // }  

}
