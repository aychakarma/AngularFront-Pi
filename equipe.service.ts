import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipe } from './equipe';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Livraison } from './livraison';
import { Produit } from './produit';

export type KeyValuePair = [string, string];

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  readonly API_URL = "http://localhost:8080/api/v1"
  readonly ENDPOINT_EQUIPES = "/equipeses"
  readonly ENDPOINT_TEST_STAT = "/test-stat" 
  readonly ENDPOINT_UP ="/up"


  constructor(private httpClient: HttpClient) { }

  getEquipes(): Observable<Equipe[]> {
    return this.httpClient.get<Equipe[]>(this.API_URL + this.ENDPOINT_EQUIPES);
  }

  getTestStatData(): Observable<KeyValuePair[]> {
    const url = `${this.API_URL}${this.ENDPOINT_TEST_STAT}`;
    return this.httpClient.get<KeyValuePair[]>(url);
  }

  getEquipeByID(id: number): Observable<Equipe> {
    return this.httpClient.get<Equipe>(`${this.API_URL}/getEquipeByID/${id}`);
} 
addEquipe(equipe: Equipe) {
  return this.httpClient.post<any>(this.API_URL + '/addEquipe', equipe);
}
deleteEquipe(id: number): Observable<void> {
  const url = `${this.API_URL}/deleteEquipe/${id}`;
  return this.httpClient.delete<void>(url);
}
updateEquipe(equipe: Equipe): Observable<Equipe> {
  const url = `${this.API_URL}/up`;
  return this.httpClient.put<Equipe>(url, equipe);
}
chercherParNom(nomEquipe: string): Observable<Equipe[]> {
  const url = `${this.API_URL}/equipes?nomEquipe=${nomEquipe}`;
  return this.httpClient.get<Equipe[]>(url);
}
countEquipesByUser() {
  return this.httpClient.get<Object[]>(`${this.API_URL}/equipes/countByUser`);
}
assignEquipeToUser(idEquipe: number, idUser: number): Observable<Equipe> {
  const url = `${this.API_URL}/yy/${idEquipe}/${idUser}`;
  return this.httpClient.post<Equipe>(url, {});
}
assignLivraisonToUser(idLivraison: number, idUser: number): Observable<Livraison> {
  const url = `${this.API_URL}/qqq/${idLivraison}/${idUser}`;
  return this.httpClient.post<Livraison>(url, {});
}
getProduitsByUser(idUser: number): Observable<Produit[]> {
  const url = `${this.API_URL}/${idUser}`;
  return this.httpClient.get<Produit[]>(url);
}

}