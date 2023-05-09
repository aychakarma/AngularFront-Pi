import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pesticide } from './pesticide';


@Injectable({
  providedIn: 'root'
})
export class PesticideService {
  readonly API_URL = "http://localhost:8080/api/v1"
  readonly ENDPOINT_PEST = "/pest"


  constructor(private httpClient: HttpClient) { }

  getPest(): Observable<Pesticide[]> {
    return this.httpClient.get<Pesticide[]>(this.API_URL + this.ENDPOINT_PEST);
  }
  addPesticide(P: Pesticide, idUser: number): Observable<Pesticide> {
    const url = `${this.API_URL}/pest/${idUser}`;
    return this.httpClient.post<Pesticide>(url, P);
  }
  
}
