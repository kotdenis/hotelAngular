import { Component, OnInit } from '@angular/core';
import { RegisterModel } from 'src/app/models/register';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerModel: RegisterModel = {firstName: '', lastName: '', userName: '', password: '', email: '', role: ''}

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    this.userService.register(this.registerModel).subscribe();
    this.router.navigate(['/login']);
  }

}
