import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Produit from 'src/app/model/Produit';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
private basicUrl='http://localhost:8080/api/v1';



  constructor(private http:HttpClient) { }


  getproduits():Observable<Produit[]>{
    return this.http.get<Produit[]>(`${this.basicUrl}/getproduits`);
}

addproduit(pr: Produit): Observable<Produit> {
  return this.http.post<Produit>(`${this.basicUrl}/addpr`, pr);
}

updateproduit(pr: Produit): Observable<Produit> {
  return this.http.put<Produit>(`${this.basicUrl}/updatebr`, pr);
}

getproduitsbyid(id:number):Observable<Produit[]>{
  return this.http.get<Produit[]>(`${this.basicUrl}/getproduitbyid/${id}`);
}

deleteProduct(productId: number) {
  const url = `${this.basicUrl}/deleteproduit/${productId}`;
  return this.http.delete(url);
}
searchAndFilter(nomProduit: string, dataCreation: Date, prixProduit: number,
  dateValidite: Date, validite: boolean, categorieProduit: string, quantite: number): Observable<Produit[]> {
  let params = new HttpParams();
  if (nomProduit) {
    params = params.set('nomProduit', nomProduit);
  }
  if (typeof dataCreation === 'string') {
    dataCreation = new Date(dataCreation);
  }
  if (dataCreation instanceof Date) {
    params = params.set('dataCreation', dataCreation.toISOString());
  }
  
  if (typeof dateValidite === 'string') {
    dateValidite = new Date(dateValidite);
  }
  if (dateValidite instanceof Date) {
    params = params.set('dateValidite', dateValidite.toISOString());
  }
  if (prixProduit) {
    params = params.set('prixProduit', prixProduit.toString());
  }
  if (validite) {
    params = params.set('validite', validite.toString());
  }
  if (categorieProduit) {
    params = params.set('categorieProduit', categorieProduit);
  }
  if (quantite) {
    params = params.set('quantite', quantite.toString());
  }
  return this.http.get<Produit[]>(`${this.basicUrl}/search`, { params: params });
}

addproduitbyuser(userId: number, produit: Produit): Observable<Produit> {
  return this.http.post<Produit>(`${this.basicUrl}/addproduitbyuser/${userId}`, produit);
}


getProduitsByUserId(userId: number): Observable<Produit[]> {
  return this.http.get<Produit[]>(`${this.basicUrl}/user/${userId}`);
}




}