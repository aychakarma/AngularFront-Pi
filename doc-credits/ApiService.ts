import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import './Terrain';
import './TypeSol';
import '../doc-folder-structure/WeatherInfo'
import { Terrain } from './Terrain';
import {WeatherInfo} from "../doc-folder-structure/WeatherInfo";
import {TypeSol} from "./TypeSol";
import {CouleurSol} from "./CouleurSol";
import {TextureSol} from "./TextureSol";

const headers= new HttpHeaders()
  .set('content-type', 'application/json');
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/Terrain';

  private apiUrl2 = 'http://localhost:8080/TypeSol';
  private apiUrl3 = 'http://localhost:8080/api/weather';


  private httpClient: any;
  private weatherInfo: WeatherInfo;

  constructor(private http: HttpClient) { }

  deleteTerrin(idTerrin: number): Observable<any> {
    console.log(typeof idTerrin);
    if (typeof idTerrin !== 'number') {
      throw new Error('Invalid id. Expected a number.');
    }
    const url = `${this.apiUrl}/deleteTerrain/${idTerrin}`;
    return this.http.delete(url);
  }

  public getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/getAllTerrains');
  }

  public getDataSol(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/terrains/nomSol');
  }
  addTerrain(newTerrain: Terrain): Observable<Terrain> {
    return this.http.post<Terrain>(`${this.apiUrl}/addTerrain`, newTerrain);
  }
  addTerrainByUSER(userId: number, newTerrain: Terrain): Observable<Terrain> {
    return this.http.post<Terrain>(`${this.apiUrl}/addTerrinbyuser/${userId}`, newTerrain);
  }



  assignTerrainToSol(idTerrin: number, idSol: number): Observable<Terrain> {
    return this.http.post<any>(`${this.apiUrl2}/AssignSolToTerrain/${idTerrin}/${idSol}`, {});

  }
  public getTypeSol(): Observable<any> {
    return this.http.get<any>(this.apiUrl2 + '/getAllSols');
  }

  public getWeatherInfo() {
    return this.http.get<WeatherInfo>(this.apiUrl3 + '/weatherNotif');


  }
  updateTerrain(terrin: Terrain): Observable<Terrain> {
    return this.http.put<Terrain>(`${this.apiUrl}/updateTerrain/`, terrin);
  }
  public guessTypeSol(couleur: CouleurSol,texture:TextureSol, value:number): Observable<any> {
    return this.http.get<any>(this.apiUrl2 + '/guessTypeSol?CouleurSol='+couleur+'&TextureSol='+texture+'&value='+value);
  }

  public getEauAdequat(idTerrin:number): Observable<any> {
    const url = `${this.apiUrl}/QuatiteEauAdequat/${idTerrin}`;
    return this.http.get(url);
  }


  public getTips(): Observable<any> {
    console.log("ena west getTips Service");
    return this.http.get('http://localhost:8080/api/weather/tip');

  }


}
