import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Commande from './model/Commande';
import { HttpClient } from '@angular/common/http';
import Produit from './model/Produit';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private basicUrl='http://localhost:8080/api/v1';
  private idCommandSource = new BehaviorSubject<number>(null);
idCommand :number
quantiy:number;

setquantite(q:number){

  this.quantiy=q
}

getquantite(){
  return this.quantiy
}


 setIdCommand(id: number) {
  this.idCommand=id ;
}

getIdcommand(){

  return this.idCommand ;
}



  constructor(private http:HttpClient) { }

    
  addCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${this.basicUrl}/addcommande`, commande);
  }
  
  addProduitToCommande(idCommande: number, idProduit: number, quantity: number): Observable<void> {
    return this.http.post<void>(`${this.basicUrl}/commandes/${idCommande}/produits/${idProduit}/${quantity}`, null);
  }

  addCommandeByUser(userId: number, commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${this.basicUrl}/addcommandebyuser/${userId}`, commande);
  }

  getAllProduitsForCommande(idCommande: number): Observable<Produit[]> {
    const url = `${this.basicUrl}/commandes/${idCommande}/produits`;
    return this.http.get<Produit[]>(url);
  }

  getTotalPrixForCommande(idCommande: number): Observable<number> {
    const url = `${this.basicUrl}/commandes/${idCommande}/totalPrix`;
    return this.http.get<number>(url);
  }
  retrieveallcommande(): Observable<Commande[]> {
    const url = `${this.basicUrl}/getcommandes`;
    return this.http.get<Commande[]>(url);
  }
  deleteCommande(id: number): Observable<void> {
    const url = `${this.basicUrl}/deletecommande/${id}`;
    return this.http.delete<void>(url);


  }
}
