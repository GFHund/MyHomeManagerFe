export interface ModalConfig{
    title:string;
    message:string;
    okButtonLabel?:string;
    cancelButtonLabel?:string;
    bShowCancelButton?:boolean;
    okButtonEvent?:Function;
    cancelButtonEvent?:Function;
    
}