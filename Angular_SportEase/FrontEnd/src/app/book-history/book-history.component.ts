import { Component, Input, OnInit} from '@angular/core';
import { bookCourtGet } from '../bookCourtGet';
import { reservationAreaService } from '../reservation-area.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-history',
  templateUrl: './book-history.component.html',
  styleUrls: ['./book-history.component.css']
})
export class BookHistoryComponent implements OnInit {
  public book!: bookCourtGet[];

  constructor(private books: reservationAreaService){}

  ngOnInit(): void {
    this.getbookings();
  }
  
  public getbookings(): void {
    this.books.getallBook().subscribe(
      (response: bookCourtGet[]) => {
        this.book = response;
        console.log(this.book);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteBooking(bookId: number): void {
    this.books.deleteBook(bookId).subscribe(
      (response: void) => {
        console.log(response);
        this.getbookings();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 
}
