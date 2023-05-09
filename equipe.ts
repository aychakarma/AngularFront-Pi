import { User } from './user';
export class Equipe {
   idEquipe: number;
   nomEquipe: string;
   numTel: number;
   nbEquipe: number;
   zone_dispo: string;
   dateDebut : Date;
   dateFin: Date;
   email: string;
   sepcialite: sepcialite;
   user: User;
}

export enum sepcialite {
  techniques,see,tt,sabuleux
}
