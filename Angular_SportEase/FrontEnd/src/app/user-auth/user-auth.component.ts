import { Component, OnInit } from '@angular/core';
import { authGet } from '../authGet';
import { reservationAreaService } from '../reservation-area.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

declare var window:any;

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  public auths!: authGet[];

  formModal:any;
  constructor(private authService: reservationAreaService){}

  ngOnInit(): void {
    this.getAuth();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    )
  }

  public getAuth(): void {
    this.authService.getallAuth().subscribe(
      (response: authGet[]) => {
        this.auths = response;
        console.log(this.auths);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  time:number=0;
  
  user:string='';
  authuser(event:any)
  {
    this.user=(<HTMLInputElement>event.target).value;
  }

  pass:string='';
  authpass(event:any)
  {
    this.pass=(<HTMLInputElement>event.target).value;
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
