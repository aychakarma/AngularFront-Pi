export class Reclamation {
    idReclamation :number
    description:string
    dateRec:Date
    datResolution: Date
    typeRec :typeRecl
    statusRec :statusRecl
    archived : boolean
    

}
export enum typeRecl {
  produit ,livraison,equipe
  }
  export enum statusRecl {
    resolu ,nonResolu,enCours,INITIALE
  }