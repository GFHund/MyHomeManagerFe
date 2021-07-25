import { Observable } from "rxjs";
import { AuthReturn } from "src/OpenApi";

export class LoginServiceMock{
    public login(user:string, password:string):Observable<AuthReturn>{
        return new Observable<AuthReturn>(subscriber => {
            subscriber.next({
                success:true,
                token:'123456789'
            }as AuthReturn)
        });
    }
}