import { User } from './user';
export class Pesticide {
  idPesticide: number;
  typePesticide: typePesticide;
  choixEquipe: boolean;
  dateLivraisonPesticide: Date;
  user: User;
 
}
export enum typePesticide {
  chimique,organique,micro 
}
