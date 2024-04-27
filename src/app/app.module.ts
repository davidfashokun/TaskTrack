import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { bearertokenInterceptor } from './interceptor/bearertoken.interceptor';
import { SharedlistComponent } from './sharedlist/sharedlist.component';
import { TodolistitemComponent } from './todolistitem/todolistitem.component';
import { TodolistComponent as PubliclistComponent } from './publiclist/publiclist.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { LogoutComponent } from './view/logout/logout.component';
import { MatDialog,MatDialogRef,MatDialogActions,MatDialogClose,MatDialogTitle,MatDialogContent } from '@angular/material/dialog';
import { NewItemComponent } from './new-item/new-item.component';
import { NewListComponent } from './new-list/new-list.component';
import { TodoListDialogComponent as NewlistdialogComponent } from './newlistdialog/newlistdialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MylistComponent } from './mylist/mylist.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    SharedlistComponent,
    TodolistitemComponent,
    PubliclistComponent,
    LogoutComponent,
    NewItemComponent,
    NewListComponent,
    NewlistdialogComponent,
    MylistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    // MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    // MatDialogRef,
    MatDialogTitle,
    MatDatepickerModule,
    MatSlideToggleModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter()
    // provideHttpClient(withInterceptors([bearertokenInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
