export default class Commande {
    idCommand?:number
    dateCommande=new Date();
    statusCommande?:"encours";
    statusPaiement?:string;
}
