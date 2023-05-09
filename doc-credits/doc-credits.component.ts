import {Component, OnInit} from '@angular/core';
import {SaisonRecolte, Terrain} from "./Terrain";
import {TypeSol} from "./TypeSol";
import {ApiService} from "./ApiService";
import {NgForm} from "@angular/forms";
import {CouleurSol} from "./CouleurSol";
import {TextureSol} from "./TextureSol";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'll-doc-credits',
  templateUrl: './doc-credits.component.html',
  styleUrls: ['./doc-credits.component.scss','./update.css','./TypeSols.css'],

})
export class DocCreditsComponent implements OnInit {

  public terrains: any;
  public nomsSol: string[] = [];
  terrainList: Terrain[] = [];
  showGuessSoilForm = false;
  EauAdequat = false;

  showLandOverview = false;
  showForm = false;
  public selectedTerrin: any = null;
  x:Terrain;
  location: any;
  surface: any;

  description: any;
  private idSol: number;
  selectedSaison: SaisonRecolte;
  selectedSoilType: TypeSol;
  currentHydratation:number;

  saisonRecolte: any;
  public saisonsRecoltes: string[] = ['SPRING', 'SUMMER', 'FALL', 'WINTER'];
  public typesSol: any [] ;
  showForm2: boolean;
  newTerrain: Terrain = {
    idTerrin: null,
    location: '',
    surface: null,
    dateObtentionTerrin: null,
    saisonRecolte: null,
    typeSol:null,

    description: null,
    idSol: null,
  };
  // @ts-ignore
  knowSoilType: boolean;
  CouleurSol:null;
  TextureSol:null;
  couleursols: CouleurSol[]=[CouleurSol.jaune, CouleurSol.marron, CouleurSol.blanchantre, CouleurSol.noire];
  texturesSol: TextureSol[]=[TextureSol.calcaire,TextureSol.moux,TextureSol.argile];
  private selectedColor: CouleurSol;
  private selectedTexture: TextureSol;
  constructor(private apiService: ApiService,public dialog: MatDialog) {
  }
  ngOnInit() {
    this.apiService.getData().subscribe((data) => {
      this.terrains = data;
    });
    this.apiService.getDataSol().subscribe((data) => {
      this.nomsSol = data.map((item) => item.nomSol)   });

    this.apiService.getTypeSol().subscribe((data) => {
      this.typesSol = data;
      console.log("ceci est liste sol : ", this.typesSol);

    });

  }
  deleteTerrin(idTerrin: number) {
    const id = Number(idTerrin);
    if (isNaN(id)) {
      console.error('Invalid terrain ID:', idTerrin);
      return;
    }
    this.apiService.deleteTerrin(id).subscribe(
      () => {
        console.log('Terrain deleted successfully');
      },
      (error) => {
        console.error('Error deleting terrain', error);
      }
    );
  }guessedTypeSol:TypeSol;
  toggleLandOverview(index: number) {
    this.showLandOverview = !this.showLandOverview;
    if (this.showLandOverview) {
      this.selectedTerrin = this.terrains[index];
    } else {
      this.selectedTerrin = null;
    }
  }
  guessSol(form: NgForm) {
    this.apiService.guessTypeSol(form.value.couleurSol,form.value.textureSol, form.value.currentHydratation)
      .subscribe(typeSolGuessed=>{
        this.guessedTypeSol = typeSolGuessed;
      });
  }
  addTerrain(form: NgForm) {

    if (!this.selectedSaison) {
      console.error('No saison selected');
      return;
    }
    const newTerrain: Terrain = {
      idTerrin: null,
      location: form.value.location,
      surface: form.value.surface,
      dateObtentionTerrin: form.value.dateObtentionTerrin,
      saisonRecolte: form.value.saisonRecolte,
      typeSol:null,
      description: form.value.description,
      idSol: form.value.idSol,
    };
    this.apiService.addTerrainByUSER(1,newTerrain).subscribe(terrin => {
      console.log("ceci est soool",form.value.typeSol);
      if (this.knowSoilType){
      this.apiService.assignTerrainToSol(terrin.idTerrin,form.value.typeSol).subscribe(terrain2=>{
        this.terrainList.push(terrain2);
        this.x=terrain2
        this.ngOnInit();
      })}
      else{
        this.apiService.assignTerrainToSol(terrin.idTerrin,this.guessedTypeSol.idSol).subscribe(terrain3=>{
              this.terrainList.push(terrain3);
              this.x=terrain3
              this.ngOnInit();
            });
        console.log("ena fi wast elseeeee"),
          console.log("ceci est couleur soool",form.value.couleurSol);
        console.log("ceci est texture soool",form.value.textureSol);
        console.log("ceci est hydration soool",form.value.currentHydratation);


      }
      form.resetForm();
    });
  }

 // this.apiService.addTerrain(newTerrain).subscribe(terrin => {




  onSelectedSaisonChange(event: any) {
    this.selectedSaison = event.target.value;
  }
  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
  updateTerrain(): void {
    const updatedTerrin: Terrain = {
      idTerrin:this.x.idTerrin,
      location:this.x.location,
      surface:this.x.surface,
      dateObtentionTerrin:this.x.dateObtentionTerrin,
      saisonRecolte:this.x.saisonRecolte,
      typeSol:this.x.typeSol,
      description:this.x.description,
      idSol:this.x.idSol,

    };

    this.apiService.updateTerrain(updatedTerrin).subscribe(terrin => {
      const index = this.terrainList.findIndex(e => e.idTerrin === terrin.idTerrin);
      this.terrainList[index] = terrin;
      this.x = terrin;
      this.ngOnInit();


    });
  }
  onSelectedSolChange(event: any) {
    this.selectedSoilType = event.target.value;
  }

  onSelectedColorChange(event: any) {
    this.selectedColor = event.target.value;

  }

  onSelectedTextureChange(event: any) {
    this.selectedTexture = event.target.value;


  }
  quantity:number
  advice:string

  getQuantiteEauAdequate(idTerrin:number) {
    this.apiService.getEauAdequat(idTerrin).subscribe(
      data => {
        console.log(data)
        this.quantity = data.Quantity
        this.advice = data.Advice
      }
    );

  }


}


