import { Component, DoCheck  } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck  {
  title = 'hotel';
  isLogged: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngDoCheck(): void {
    this.isLogged = this.userService.isLoggedIn;
  }

  logout():void {
    let st: number;
    this.userService.logout().subscribe(x => st = x.status);
    this.isLogged = false;
    this.router.navigate(['/login']);
  }
}
