import { ToDoListItemNg } from "./ToDoListItemNg";

export interface ToDoListNg{
    id: string;
    title: string;
    active: boolean;
    items: ToDoListItemNg[];
}