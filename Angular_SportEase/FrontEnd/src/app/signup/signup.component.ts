import { Component,Input, OnInit } from '@angular/core';
import { auth } from '../auth';
import { reservationAreaService } from '../reservation-area.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { EncrDecrServiceService } from '../encr-decr-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: reservationAreaService,private EncrDecr: EncrDecrServiceService){}



  ngOnInit(): void {
    
  }

  pass:string='';
  auth(event:any)
  {
    this.pass=(<HTMLInputElement>event.target).value;
    if(this.pass != '')
    {
      const encrypted= this.EncrDecr.set('123456$#@$^@1ERF', this.pass);
      console.log(encrypted);
      const decrypted= this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
      console.log(decrypted);
    }
  }

  //encrypted= this.EncrDecr.set('123456$#@$^@1ERF', this.pass);

  //

  conf:string='';
  confirm(event:any)
  {
    this.conf=(<HTMLInputElement>event.target).value;
  }

  public AddAuth(addForm: NgForm): void{
    this.authService.addAuth(addForm.value).subscribe(
      (response: auth) => {
        console.log(response);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

}
