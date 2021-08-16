import { Observable } from 'rxjs';
export enum AppModes{
    LIVE = 0,
    OFFLINE = 1,
    DEMO = 2
}

export interface AppSettings{
    mode:AppModes;
}