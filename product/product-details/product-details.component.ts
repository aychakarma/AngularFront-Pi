import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Commande from 'src/app/model/Commande';
import Produit from 'src/app/model/Produit';
import { ProduitService } from '../produit.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommandeService } from 'src/app/commande.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'll-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  Produits: Observable<Produit[]>;
    categories: string[] = ['legumes', 'fruits'];
    commande: Commande = new Commande();
    produitId: number;
    quantity: number;
    commandeid:number;
    p:Observable<Produit[]>;
    newCommand: Commande = new Commande();
    totalPrix: number;
    newProduct: Produit = new Produit();



    command={
      statusCommande:"",
      statusPaiement:""

    };


    statusCommande:string[]=['livrée','encours','annulée','confirmée'];
    statusPaiement:string[]=['paiementEnLigne','paiementAlaLivraison'];
    
    

    constructor(private router: Router,private produitservice:ProduitService, private activatedRoute: ActivatedRoute,private commandeService:CommandeService){}

    ngOnInit(): void {
       this.Produits = this.produitservice.getproduits();

}

    
createCommande(): void {
  this.commande.statusCommande="encours";
  this.commandeService.addCommandeByUser(1, this.commande).subscribe((newCommande: Commande) => {
    this.commandeid = newCommande.idCommand;
    this.commandeService.setIdCommand(this.commandeid); // Set the idCommand value in the shared service
});  
}
edit(command){
  this.command=command;
}


addProduitToCommande(idCommand: number, produitId: number, quantity: number): void {
  this.commandeService.addProduitToCommande(idCommand, produitId, quantity).subscribe(() => {
    // The product was added to the command successfully
    console.log('Product added to command');
    this.commandeService.setquantite(quantity);
    this.p = this.commandeService.getAllProduitsForCommande(idCommand);
    this.commandeService.getTotalPrixForCommande(idCommand)
    .subscribe((total) => {
        this.totalPrix = total;
    });
});
}


onSearchAndFilterSubmit(formValues) {
  this.Produits = this.produitservice.searchAndFilter(formValues.nomProduit,
    formValues.dateCreation, formValues.prixProduit, formValues.dateValidite,
    formValues.validite, formValues.categorieProduit, formValues.quantite);
}

}