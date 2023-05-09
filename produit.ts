import { Commande } from "./commande";
import { User } from "./user";

export class Produit {
  idproduit:number;
  nomProduit:string;
  dataCreation:Date;
  prixProduit:number;
  dateValidite:Date;
  validite:Boolean;
  quantite:number;
  qtitDechet:number;
  maxDechet:number;
  User:User;
  commandes:Commande;
}
