import { Component, OnInit, Input } from '@angular/core';
import { reservationArea } from '../reservationArea';
import { reservationAreaService } from '../reservation-area.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';


declare var window:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public reservation!: reservationArea[];

  formModal:any;

  constructor(private areaService: reservationAreaService){}
  ngOnInit(): void {
    this.getAreas();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal1")
    )
    
  }

  public getAreas(): void {
    this.areaService.getallAreas().subscribe(
      (response: reservationArea[]) => {
        this.reservation = response;
        console.log(this.reservation);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openModal()
  {
    this.formModal.show();
  }

  closeModal()
  {
    this.formModal.hide();
  }
  

  product =[
    {area:"Park",name:"Sunrise Sike Park",Rating:"4.0",Location:"9530 119A Cambie Street",Sport:"Baseball",availability:12, rate:"15.3",country:"Canada",province:"BC",city:"Surrey",link:"https://www.sunrise.ski"},
    {area:"SportCentre",name:"Rockstar Premium Park",Rating:"3.7",Location:"842 Cambie Street",Sport:"Volleyball",availability:-1,rate:"20",country:"Canada",province:"BC",city:"Delta",link:"https://www.trailforks.com/skillpark/rockstar-energy-bike-park/"},
    {area:"CommunityGround",name:"Roundhouse Community Arts & Recreation Centre",Rating:"4.6",Location:"181 Roundhouse Mews",Sport:"Volleyball",availability:-5,rate:"19",country:"Canada",province:"NS",city:"Sydney",link:"https://www.roundhouse.ca"},
    {area: "Park", name: "Stanley Park", Rating: "4.8", Location:"Stanley Park Dr", Sport: "Cricket", availability: 2, rate: "4.5", city: "Jasper",province: "SE", country: "US",link:"https://vancouver.ca/parks-recreation-culture/stanley-park.aspx"},
    {area: "SportCentre", name: "Empire Fields", Rating: "2.1", Location:"W 33rd Ave", Sport: "Badminton", availability: 11, rate: "32", city: "PortMoody",province:"BC", country: "Canada",link:"https://vafc.ca/fields/empire-fields/"},
    {area: "Park", name: "Queen Elizabeth Park", Rating: "2.5", Location:"480 Broughton St", Sport: "Golf", availability: 6, rate: "16", city: "Delta",province: "BC", country: "Canada",link:"https://vancouver.ca/parks-recreation-culture/queen-elizabeth-park.aspx"},
    {area: "CommunityGround", name: "Coal Harbour Community Centre", Rating: "5.0", Location:"3100 Foul Bay Rd", Sport: "Tennis", availability: 5, rate:"12", city: "Ottawa",province: "BC", country: "Canada",link:"https://vancouver.ca/parks-recreation-culture/coal-harbour-community-centre.aspx"},
    {area: "CommunityGround", name: "Trillium Park", Rating: "1.8", Location:"2901 E Hastings St", Sport: "Tennis", availability: -3, rate: "41", city: "grosp",province: "MEX", country: "US",link:"https://www.tripadvisor.ca/Attraction_Review-g155019-d12677263-Reviews-Trillium_Park-Toronto_Ontario.html"},
    {area: "Park", name: "Oak Bay Recreation Centre", Rating:"3.3", Location:"Cornwall Ave", Sport: "Baseball", availability: 2, rate: "62", city: "Riverdale",province: "MO", country: "Canada",link:"https://www.oakbay.ca/parks-recreation/facilities-rentals/recreation-centres/oak-bay-recreation-centre"},
    {area: "SportCentre", name: "Centennial Stadium", Rating: "4.1", Location:"1975 Bee St", Sport: "Cricket", availability: 4, rate: "5", city: "princeEdward",province: "BC", country: "Canada",link:"https://www.uvic.ca/search/maps-buildings/buildings/centennial-stadium.php"}]
//product data must be come from the database
  @Input() click:boolean=false;
  @Input() area:string="x";
  @Input() type:string="y";
  @Input() list:boolean=false;
  @Input() country:string='';
  @Input() province:string='';
  @Input() city:string='';



}
