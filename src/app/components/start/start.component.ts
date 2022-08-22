import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  imgPath: string = '../assets/rhema-kallianpur.jpg';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  bookRoom(): void {
    this.router.navigate(['/shared']);
  }
}
