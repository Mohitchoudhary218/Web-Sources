import { Component, OnInit, Input } from '@angular/core';
import { reservationAreaService } from '../reservation-area.service';
declare var window:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  formModal:any;


  
  constructor(private authService: reservationAreaService){}
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    )
    
  }

  openModal()
  {
    this.formModal.show();
  }

  closeModal()
  {
    this.formModal.hide();
  }
  

}
