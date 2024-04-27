import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { UserToken } from '../model/usertoken';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom, of } from 'rxjs';
import { UserInfo } from '../model/user-info';
import { Todolist } from '../model/todolist';
import { Router } from '@angular/router';
import { Todolistitem } from '../model/todolistitem';

@Injectable({
  providedIn: 'root'
})
export class AuthSvcService {

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private router:Router) { 
    let storedToken = localStorage.getItem("currentUserToken");

    if(storedToken){
      this.currentUserToken = JSON.parse(storedToken);
    }
  }
  currentUserToken:UserToken|null=null;
  UserLoggedIn:EventEmitter<string>= new EventEmitter<string>();
  currentUser: UserInfo|null=null;
  //Still skeptical about this below:
  currentTodoList:Todolist|null=null;
  todoLists: Todolist[]=[]
  todoListItems:Todolistitem[]=[]
  activeLogin:EventEmitter<boolean>=new EventEmitter<boolean>();
  async LoginUser(email:string, password:string)
  {

      let authUser = btoa(`${email}:${password}`);
      let httpHeaders = new HttpHeaders();
      httpHeaders = httpHeaders.set('Authorization', `Basic ${authUser}`)
    try
    {
      let userToken = await firstValueFrom(this.httpClient.post<UserToken>('https://unfwfspring2024.azurewebsites.net/user/login',null,{headers:httpHeaders}));
      this.currentUserToken = userToken;
      localStorage.setItem('currentUserToken',JSON.stringify(userToken));
      this.UserLoggedIn.emit(email);
      // return {status: 200, token: userToken};
      return userToken;
    }
    catch(err:any)
    {
    
      this._snackBar.open(`Login failed! Error: ${err.error.status}-${err.error.message}`,'Close',{verticalPosition:'top',duration:3000});
      return firstValueFrom(of(null));
    
    }
  }

  async CreateUser(emailAddress:string, pwd:string, userName:string)
  {
    let userData = {
      email: emailAddress, 
      password: pwd,
      name:userName
    };

    try
    {
      let response = await firstValueFrom(this.httpClient.post('https://unfwfspring2024.azurewebsites.net/user/',userData));
      console.log(response);
      this._snackBar.open('User created!','Close');
      return true;
    }
    catch(err:any)
    {
      console.log(err);
      this._snackBar.open(`User creation failed! Error: ${err.error.status}- ${err.error.message}`,'Close',{verticalPosition:'bottom',duration:3000});
      return false
    }
  }

  async GetCurrentUser() {
    if (this.currentUserToken){
    try {
      let userInfo = await firstValueFrom(this.httpClient.get<UserInfo>('https://unfwfspring2024.azurewebsites.net/user/',{headers:{'Authorization':`Bearer ${this.currentUserToken?.token}`}}))
      // let userInfo = await firstValueFrom(this.httpClient.get<UserInfo>('https://unfwfspring2024.azurewebsites.net/user/'))
      this.currentUser = userInfo
      return userInfo;
    } catch(err: any){
      this._snackBar.open('Errror getting current user: Invalid Token','Close',{verticalPosition:'bottom', duration:3000});
      return firstValueFrom(of(null))
    }
  } else{
    this._snackBar.open('Error getting current user: Not Authorized','Close',{verticalPosition:'bottom'})
    return firstValueFrom(of(null));
  }
  }
  SetCurrentUser(newUser:UserInfo){
    this.currentUser = newUser;
  }
  
  async AddNewList(newListTitle:string,newListPublic_List:boolean) {
    try {
      let listData = {
        title:newListTitle,
        public_list:newListPublic_List
      }
        let newList = await firstValueFrom(this.httpClient.post<Todolist>('https://unfwfspring2024.azurewebsites.net/todo/',listData,{headers:{'Authorization':`Bearer ${this.currentUserToken?.token}`}}))
        this.todoLists.push(newList);
        this.router.navigate(['mylist'])
        return newList;
        
    } catch(err:any){
      this._snackBar.open(`Error adding new List ${err.error.status}-${err.error.message}`,'Close',{verticalPosition:'bottom', duration:3000});
      return firstValueFrom(of(null))
    }
  }
  async GetTodoLists() {
    try {
      if(this.currentUser){
      let allLists = await firstValueFrom(this.httpClient.get<Todolist[]>('https://unfwfspring2024.azurewebsites.net/todo/',{headers:{'Authorization':`Bearer ${this.currentUserToken?.token}`}}))
      // let lists = await firstValueFrom(this.httpClient.get<Todolist[]>('https://unfwfspring2024.azurewebsites.net/todo/'))
      for (let row of allLists) {
        this.todoLists.push(row)
      }
      return allLists;
    }
    else {
      let onlyPublicLists = await firstValueFrom(this.httpClient.get<Todolist[]>('https://unfwfspring2024.azurewebsites.net/todo/'))
      return onlyPublicLists;
    }
      // return this.todoLists;
      
    } catch(err: any){
      this._snackBar.open(`Error getting todoLists ${err.error.status}-${err.error.message}`,'Close',{verticalPosition:'bottom', duration:3000});
      return firstValueFrom(of(null))
    }
  }
  
  async getPublicLists(): Promise<Todolist[] | undefined> {
    let allLists = await this.GetTodoLists();
    let publicLists = allLists?.filter(list=>list.public_list==true)

    return publicLists;
  }
  async getMyLists():Promise<Todolist[] | undefined>{
    let allLists = await this.GetTodoLists();
    let myLists = allLists?.filter(list=>list.created_by == this.currentUser?.id)
    return myLists
  }
  async getSharedLists():Promise<Todolist[] | undefined>{
    let allLists = await this.GetTodoLists();
    let sharedLists = allLists?.filter(list=>
      list.created_by !== this.currentUser?.id && !list.public_list);
    return sharedLists
  }
  async deleteToDoList(list:Todolist){

    try {
    let selectedList = await firstValueFrom(this.httpClient.delete<Todolist>(`https://unfwfspring2024.azurewebsites.net/todo/${list.id}`,{headers:{'Authorization':`Bearer ${this.currentUserToken?.token}`}}))
    this.todoLists.splice(selectedList.id);
    this.router.navigate(['mylist'])

    }catch(err:any){
  this._snackBar.open('Error deleting list','Close',{verticalPosition:'bottom', duration:3000});
    }
  }

  async addNewItem (list_id:number,newItem:{task:string,due_date:string|null}){
    try {
      let result = await firstValueFrom(this.httpClient.post<Todolistitem>(`https://unfwfspring2024.azurewebsites.net/todo/${list_id}/item`,newItem,{headers:{'Authorization':`Bearer ${this.currentUserToken?.token}`}}))
      // const list = this.todoLists.find((list)=>list.id==list_id)
      
      // // if(list) {
      // // list.list_items.push(result)
      // // }
      return result;
    } catch (err:any) {
      console.log(err)
      this._snackBar.open('Error adding new item: Unauthorized','Close',{verticalPosition:'bottom', duration:3000});
      return null;
    }
  }

  logout() {
    localStorage.removeItem('currentUserToken');
    this.currentUserToken = null;
    this.UserLoggedIn.next("")
    this.router.navigate(['login'])
  }
}
