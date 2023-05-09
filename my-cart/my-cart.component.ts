import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import Produit from 'src/app/model/Produit';
import { Observable, Subscription, of } from 'rxjs';
import { ProduitService } from '../product/produit.service';
import { CommandeService } from 'src/app/commande.service';
import Commande from 'src/app/model/Commande';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent {

  Produits: Observable<Produit[]>;
  categories: string[] = ['legumes', 'fruits'];
  commande: Commande = new Commande();
  produitId: number;
  quantity: number;
  commandeid:number;
  p:Observable<Produit[]>;
  idCommand: number;


 /// statusCommande:string[]=['livrée','encours','annulée','confirmée'];
  statusPaiement:string[]=['paiementEnLigne','paiementAlaLivraison'];
  commandeParamsSubscription: Subscription;
  totalPrix: number;


  
  

  constructor(private produitservice:ProduitService, private activatedRoute: ActivatedRoute, private router: Router ,private commandeService:CommandeService){}

  ngOnInit(): void {
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

  

    
 /*  createCommande(): void {
    this.commandeService.addCommandeByUser(1, this.commande)
      .subscribe((newCommande: Commande) => {
        this.commandeid=newCommande.idCommand;

        // The new command is returned by the API, so you can use its ID to add a product to it
      });  
  } */
  
/*  createCommandewithuser(): void {
    this.commandeService.addCommandeByUser(userId, this.commande)
      .subscribe((newCommande: Commande) => {|
        // The new command is returned by the API, so you can use its ID to add a product to it
        this.addProduitToCommande(newCommande.idCommand);
      });
  */
    /*   addProduitToCommande(idCommand: number, produitId: number, quantity: number): void {
        this.commandeService.addProduitToCommande(idCommand, produitId, quantity)
          .subscribe(() => {
            // The product was added to the command successfully
            console.log('Product added to command');
           this.p= this.commandeService.getAllProduitsForCommande(idCommand);
           this.totalPrix=  this.commandeService.getTotalPrixForCommande(idCommand);

            
      
          });
       //   this.commandeService.getAllProduitsForCommande(idCommand);

      } */


      addProduitToCommande(idCommand: number, produitId: number, quantity: number): void {
        this.commandeService.addProduitToCommande(idCommand, produitId, quantity).subscribe(() => {
          // The product was added to the command successfully
          console.log('Product added to command');
          this.p = this.commandeService.getAllProduitsForCommande(idCommand);
          this.commandeService.getTotalPrixForCommande(idCommand)
          .subscribe((total) => {
              this.totalPrix = total*quantity;
          });
  });
      }
      
      displayproductwithcommand(): void {
        this.activatedRoute.queryParams.subscribe(params => {
          const idCommand = params['idCommand'];
          this.commandeService.getAllProduitsForCommande(idCommand).subscribe(p => (this.p = of(p)));
        });
      }
      
  }





