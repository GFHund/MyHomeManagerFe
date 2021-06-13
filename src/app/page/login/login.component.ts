import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { AuthReturn } from 'src/OpenApi';
import { DefaultReturn } from 'src/OpenApi/model/defaultReturn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public loginSerivce:LoginService,public router:Router) { }

  ngOnInit(): void {
  }
	public onSubmit(form:NgForm){
		let value = form.value;
		this.loginSerivce.login(value.user,value.password).subscribe((retValue:AuthReturn) => {
			console.log(retValue);
			if(retValue.success){
				this.router.navigate(['/']);
			}
			else{
				
			}
		});
	}
}
