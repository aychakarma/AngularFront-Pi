import { User } from './user';
import { Commande } from './commande';
export class Livraison {
  idLivraison:number;
  prixLivraison:number;
  numeroRegionDest: number;
  dateLivraison:Date;
  statusPaiement:statusPaiement;
  user: User;
  Commandes:Commande;
}
export enum statusPaiement {
  paiementEnLigne,paiementAlaLivraison
}