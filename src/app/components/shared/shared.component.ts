import { Component, OnInit } from '@angular/core';
import { RoomModel } from 'src/app/models/roomModel';
import { SharedService } from 'src/app/services/shared.service';
import { SearchModel } from 'src/app/models/searchModel';
import { BookModel } from 'src/app/models/bookModel';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

  roomModel: RoomModel[] = [];
  searchModel: SearchModel = {capacity: 1, dateBegin: new Date(), dateEnd: new Date()}
  bookModel: BookModel = {firstName: '', lastName: '', bookForDate: new Date(), dateOut: new Date(), roomNumber: 0}
  roomNumber: number = 0;
  isAvailable: boolean = false;

  tableSize: number = 7;
  tableSizes: any = [3, 6];
  page: number = 1;
  count: number = 0;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getVacantRooms();
  }

  getVacantRooms():void {
    this.sharedService.getVacantRooms().subscribe(room  => this.roomModel = room);
  }

  findRoom(): void{
    this.sharedService.findRoom(this.searchModel)
      .subscribe(data => {this.roomModel = data; if(this.roomModel.length > 0){this.isAvailable = true;}})
  }

  bookRoom():void {
    this.bookModel.bookForDate = this.searchModel.dateBegin;
    this.bookModel.dateOut = this.searchModel.dateEnd;
    this.bookModel.roomNumber = this.roomNumber;
    this.sharedService.bookRoom(this.bookModel).subscribe(x => this.isAvailable = x);
  }

  onTableDataChange(event: any){
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}
