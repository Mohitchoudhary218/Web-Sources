import { Component,Input, OnInit } from '@angular/core';
import { bookCourt } from '../bookCourt';
import { reservationAreaService } from '../reservation-area.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{

  constructor(private areaService: reservationAreaService){}

  ngOnInit(): void {

    }
  
    public AddBooking(addForm: NgForm): void{
      this.areaService.addBook(addForm.value).subscribe(
        (response: bookCourt) => {
          console.log(response);
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    }


  @Input() click:boolean=false;
  @Input() data=[{id:"",area:"",name:"",rating:"",location:"",sport:"",availability:0, rate:"",city:"",province:"",country:"",link:"",userCode:""}];

}
