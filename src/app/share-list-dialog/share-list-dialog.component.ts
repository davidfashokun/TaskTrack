import { Component, Inject } from '@angular/core';
import { AuthSvcService } from '../services/auth-svc.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todolist } from '../model/todolist';

@Component({
  selector: 'app-share-list-dialog',
  templateUrl: './share-list-dialog.component.html',
  styleUrl: './share-list-dialog.component.css'
})
export class ShareListDialogComponent {
  email: string = '';
  listId: number;
  todoLists:Todolist[]=[];
  constructor(
    private authSvc: AuthSvcService,
    private dialogRef: MatDialogRef<ShareListDialogComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { listId: number }
  ) {
    this.listId = data.listId;
  }

  shareList() {
    if (this.authSvc.UserLoggedIn) {
      const listExistsAndOwned = this.authSvc.isListExistsAndOwned(this.listId);
      const alreadyShared = this.todoLists.find(l=>l.id===this.listId)?.shared_with.find(list=>list.email)
      if (listExistsAndOwned) {
      this.authSvc.shareList(this.listId, this.email)
        .then((result: any) => {
          if (result) {
            this.snackbar.open('List shared successfully', 'Close', { duration: 3000 });
            this.dialogRef.close();
          } else if (alreadyShared) {
            this.snackbar.open('List shared previously', 'Close',{ duration: 3000 });
          } 
          else {
            this.snackbar.open('Recipient user not found', 'Close',{ duration: 3000 });
          }
        })
        .catch((error: any) => {
          this.snackbar.open('Not authorized to share this list:', 'Close');
        });
      }
    } else {
      this.snackbar.open('You are not logged in', 'Close');
    }
  }
}