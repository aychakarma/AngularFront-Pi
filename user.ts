
export class User {
  idUser: number;
  username: string;
  password: string;
  numTel: any;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  enabled:true;
  locked:false;
  image?:string;
  

  
}
export enum Role {
  client,agriculteur
}