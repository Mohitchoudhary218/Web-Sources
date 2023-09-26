import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  ngOnInit(): void {
  }

 

  values:string="";
  area(event:any)
  {
    this.values=(<HTMLInputElement>event.target).value;
  }

  games:string="";
  sport(event:any)
  {
    this.games=(<HTMLInputElement>event.target).value;
  }

  tog:boolean=false;
  toggle()
  {
    this.tog=true;
  }

  view:boolean=false;
  display:number=2;

  show(event:any)
  {
    if(this.display % 2 == 0)
    {
      this.view=true;
      this.display = this.display + 1;
    }
    else{
      this.view=false;
      this.display = this.display + 1;
    }
  }

  place:string='';
  country(event:any)
  {
    this.place=(<HTMLInputElement>event.target).value;
  }

  state:string='';
  province(event:any)
  {
    this.state=(<HTMLInputElement>event.target).value;
  }

  town:string='';
  city(event:any)
  {
    this.town=(<HTMLInputElement>event.target).value;
  }
}
