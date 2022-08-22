import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/login';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel = {userName: '', password: ''}

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login() : void {
    this.userService.login(this.loginModel).subscribe();
    this.router.navigate(['/']);
  }

}
