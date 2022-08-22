import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GuestModel } from 'src/app/models/guestModel';
import { GuestSearchModel } from 'src/app/models/guestSearchModel';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  guestModels: GuestModel[] = [];
  guestSearchModel: GuestSearchModel = {firstName: '', lastName: ''}

  tableSize: number = 7;
  tableSizes: any = [3, 6];
  page: number = 1;
  count: number = 0;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getGuests();
  }

  getGuests(): void {
    this.adminService.getGuests().subscribe(guests => this.guestModels = guests);
  }

  searchGuest(): void {
    this.adminService.searchGuests(this.guestSearchModel).subscribe(x => this.guestModels = x);
  }

  onTableDataChange(event: any){
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}
