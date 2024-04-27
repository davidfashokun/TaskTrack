import { ShareTodoList } from "./share-todo-list";
import { Todolistitem } from "./todolistitem";

export interface Todolist {
    id:number;
    title:string;
    created_at:string;
    public_list:boolean;
    created_by:number;
    list_items:Todolistitem[];
    shared_with:ShareTodoList[]
}
