import { Observable } from 'rxjs';
export interface SelectOptions{
    id:string;
    text:string;
}

export interface FormSelectInterface{
    getSelectOptions(search:string):Observable<SelectOptions[]>;
    getLabelFromId(id:string):Observable<string>;
}