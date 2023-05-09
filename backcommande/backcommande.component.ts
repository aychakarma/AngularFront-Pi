import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import Produit from 'src/app/model/Produit';
import { Observable, Subscription, of } from 'rxjs';
import { ProduitService } from '../product/produit.service';
import { CommandeService } from 'src/app/commande.service';
import Commande from 'src/app/model/Commande';


@Component({
  selector: 'app-backcommande',
  templateUrl: './backcommande.component.html',
  styleUrls: ['./backcommande.component.scss']
})
export class BackcommandeComponent {
  Produits: Observable<Produit[]>;
  categories: string[] = ['legumes', 'fruits'];
  commande: Commande = new Commande();
  produitId: number;
  quantity: number;
  commandeid:number;
  p:Observable<Produit[]>;
  idCommand: number;
  Commands:Observable<Commande[]>;



 /// statusCommande:string[]=['livrée','encours','annulée','confirmée'];
  statusPaiement:string[]=['paiementEnLigne','paiementAlaLivraison'];
  commandeParamsSubscription: Subscription;
  totalPrix: number;


  
  

  constructor(private produitservice:ProduitService, private activatedRoute: ActivatedRoute, private route: ActivatedRoute ,private commandeService:CommandeService){}

  ngOnInit(): void {
    this.Commands=this.commandeService.retrieveallcommande()
//     this.Produits = this.produitservice.getproduits();
    this.idCommand=this.commandeService.getIdcommand();
    this.quantity=this.commandeService.getquantite();

    
        
        this.p = this.commandeService.getAllProduitsForCommande(this.idCommand);
        this.commandeService.getTotalPrixForCommande(this.idCommand)
          .subscribe((total) => {
            this.totalPrix =  total*this.quantity;
          });
      }

  ngOnDestroy(): void {
    this.commandeParamsSubscription.unsubscribe();
  }

  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
  }
  createCommande(): void {
    this.commande.statusCommande="encours";
    this.commandeService.addCommandeByUser(1, this.commande).subscribe((newCommande: Commande) => {
      this.commandeid = newCommande.idCommand;
  });  
  }

  deleteCommande(id: number) {
    this.commandeService.deleteCommande(id).subscribe(() => {
      this.commandeService.retrieveallcommande(); // Reload the list of commandes after deleting
    });
  }

}
