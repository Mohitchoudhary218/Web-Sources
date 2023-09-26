import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { reservationAreaService } from './reservation-area.service';
import { EncrDecrServiceService } from './encr-decr-service.service';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from './container/container.component';
import { ReservationComponent } from './reservation/reservation.component';
import { BackgroundComponent } from './background/background.component';
import { ListComponent } from './list/list.component';
import { BookingComponent } from './booking/booking.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { UserAuthContainerComponent } from './user-auth-container/user-auth-container.component';
import { BookHistoryComponent } from './book-history/book-history.component';


const appRoutes: Routes = [
  { path:'HomePage', component: ContainerComponent},
  { path:'', component: UserAuthContainerComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    ReservationComponent,
    BackgroundComponent,
    ListComponent,
    BookingComponent,
    HeaderComponent,
    UserAuthComponent,
    SignupComponent,
    UserAuthContainerComponent,
    BookHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [reservationAreaService,EncrDecrServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
