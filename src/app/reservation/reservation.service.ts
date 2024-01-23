import { Injectable, OnInit } from '@angular/core';
import { Reservations } from '../models/reservations';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService implements OnInit {

  private apiUrl = "http://localhost:3001"
  private reservations: Reservations[] = [];

  constructor(private http: HttpClient){
  }

  ngOnInit(): void{
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }

getReservations(): Observable<Reservations[]> {
return this.http.get<Reservations[]>(this.apiUrl + "/reservations");
}

getReservation(id: string):Observable<Reservations>{
  return this.http.get<Reservations>(this.apiUrl + "/reservation/"+id);
}

addReservation(reservation: Reservations): Observable<void> {
  return this.http.post<void>(this.apiUrl + "/reservation/",reservation);
}

deleteReservation(id: string): Observable<void>{
  return this.http.delete<void>(this.apiUrl + "/reservation/"+id);
}

updateReservation(id: string, updatedReservations: Reservations): Observable<void> {
return this.http.put<void>(this.apiUrl + "/reservation/" +id,updatedReservations);
}

}
