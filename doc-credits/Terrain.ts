import {TypeSol} from "./TypeSol";

export enum SaisonRecolte {
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  FALL = 'FALL',
  WINTER = 'WINTER'
}

export class Terrain {
  idTerrin: number;
  location: string;
  surface: number;
  dateObtentionTerrin: Date;
  saisonRecolte: SaisonRecolte;
  typeSol:TypeSol;

  description: string;
  idSol: number;

  constructor(
    idTerrin: number,
    location: string,
    surface: number,
    dateObtentionTerrin: Date,
    saisonRecolte: SaisonRecolte,
    typeSol:TypeSol,
    description: string,
     idSol: number)
  {
    this.idTerrin = idTerrin;
    this.location = location;
    this.surface = surface;
    this.dateObtentionTerrin = dateObtentionTerrin;
    this.saisonRecolte = saisonRecolte;
    this.typeSol=typeSol;
    this.description = description;
    this.idSol = idSol;
  }


}
