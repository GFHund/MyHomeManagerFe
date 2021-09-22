import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthReturn, AuthService, DefaultReturn } from 'src/OpenApi';
import { Login } from 'src/OpenApi/model/login';
import { SessionStorageService } from '../sessionStorage/session-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public authService:AuthService,
	public sessionStorageService:SessionStorageService) {
	this.authService.configuration.basePath = environment.serverUrl;
 }
	public login(user:string, password:string):Observable<AuthReturn>{
		let loginObj:Login = {username:user,passwort:password};
		return this.authService
		.loginUser(loginObj)
		.pipe(map((response) => {
			if(response === null){
				return response;
			}
			const bearerToken = response.token;
			if(bearerToken){
				const token = bearerToken.substr(6);
				this.sessionStorageService.set('token',token);
			}
			return response;
		}));
	}
}
