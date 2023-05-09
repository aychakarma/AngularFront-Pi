import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Reclamation } from "./reclamation";
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  constructor(private httpClient: HttpClient) { }
readonly baseUrl="http://localhost:8080/api/v1/addById";
  readonly API_URL = "http://localhost:8080/api/v1"
  readonly ENDPOINT_get = "/getAllRec"
  readonly ENDPOINT_del = "/delReclamation/{id}"
  readonly ENDPOINT_getbyIdUser = "/reclamation/{userId}"


    getReclamations(): Observable<Reclamation[]> {
      return this.httpClient.get<Reclamation[]>(this.API_URL + this.ENDPOINT_get);
    }

    getReclamationsbyIdUser(idUser : number): Observable<Reclamation[]> {
      return this.httpClient.get<Reclamation[]>(` ${this.API_URL}/reclamation/`+idUser);
    }

    createReclamation(value: any ,id: any): Observable<Reclamation> {
      return this.httpClient.post<Reclamation>(`${this.baseUrl}/${id}`, value);
    }
  
    deleteReclamation(idReclamation: number): Observable<Object>{
      return this.httpClient.delete(`${this.API_URL}/delReclamation/${idReclamation}`);
    }


updateReclamation(value: any ,id: number): Observable<Reclamation> {
  return this.httpClient.put<Reclamation>(`${this.API_URL}/updateReclamation/${id}`, value);
}

countByStatus() {
  return this.httpClient.get(`${this.API_URL}/count-by-status`);
}
getByArchivedTrue(): Observable<Reclamation[]>{
  return this.httpClient.get<Reclamation[]>(` ${this.API_URL}/archive`);
}

archiveReclamationResolu(id){
  return this.httpClient.put(`${this.API_URL}/archiverReclamationResolu`+ id, null);
}


  //   getJobOffer(id : number): Observable<JobOffer> {
  //     return this.http.get<JobOffer>(`${this.baseUrl}/`+ id);
  //   }
  //   updateJobOffer(id: number, value: any): Observable<JobOffer> {
  //     return this.http.put<JobOffer>(${this.baseUrl}/${id}, value);
  //   }

  //   deleteJobOffer(id: number): Observable<any> {
  //     return this.http.delete(${this.baseUrl}/${id}, { responseType: 'text' });
  //   }
  }
