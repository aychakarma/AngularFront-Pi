import {Equipe } from './equipe';
import { Pesticide } from './pesticide';
export class User {
  idUser: number;
  username: string;
  firstname:string;
  lastname:string;
  password: string;
  numTel: number;
  confirmationToken:string;
  locked:boolean=false;
  enabled:boolean=false;
  confirmPassword:string;
  email: string;
  name: string;
  role: Role;
  equipes: Equipe[];
  pesticide:Pesticide[];
  
}
export enum Role {
  admin,client,agriculteur
}