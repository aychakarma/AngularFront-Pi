import { Data } from "@angular/router";

export default class Produit {
    idproduit?: number;
    nomProduit?: string;
    dataCreation?: Date;
    prixProduit?: number;
    dateValidite?: Date;
    validite: boolean;
    categorieProduit?: string;
    quantite?: number;
    qtitDechet?: number;
    maxDechet?: number;
    terrin?: number;
    user?: number;  
    image?:string ;
    
  }