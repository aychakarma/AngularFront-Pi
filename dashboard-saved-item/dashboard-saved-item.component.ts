import { Component, OnInit } from '@angular/core';
import { EquipeService } from 'src/app/equipe.service';
import { Equipe } from 'src/app/equipe';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/user';
import * as moment from 'moment';


@Component({
  selector: 'll-dashboard-saved-item',
  templateUrl: './dashboard-saved-item.component.html',
  styleUrls: ['./dashboard-saved-item.component.scss']
})
export class DashboardSavedItemComponent implements OnInit {
  headTitleName = document.querySelector(
    ".responsive-table__head__title--name"
  );
  dateDebutFormattedInput: string;
  dateFinFormatted: string;
  equipes: Equipe[] = [];
  equipeSelectionnee: Equipe;
  view: 'table' | 'form' = 'table';
  afficherFormulaire: boolean = false;
  afficherModifierFormulaire: boolean = false;
  nouvelleEquipe: Equipe = {
    idEquipe: null,
    nomEquipe: '',
    numTel: null,
    nbEquipe: null,
    zone_dispo: '',
    dateDebut: null,
    dateFin: null,
    email: null,
    sepcialite:null,
    user: null
  };


  constructor(private equipeService: EquipeService) {
    this.equipes = [];
    this.view = 'table';
  }
  

  ngOnInit(): void {
    this.equipeService.getEquipes().subscribe(equipes => {
      this.equipes = equipes;

       /* Please ❤ this if you like it! 😊 */

// Select thead titles from Dom
// Select thead titles from Dom
const headTitleName = document.querySelector(
	".responsive-table__head__title--name"
) as HTMLElement;
const headTitleStatus = document.querySelector(
	".responsive-table__head__title--status"
) as HTMLElement;
const headTitleTypes = document.querySelector(
	".responsive-table__head__title--types"
) as HTMLElement;
const headTitleUpdate = document.querySelector(
	".responsive-table__head__title--update"
) as HTMLElement;
const headTitleCountry = document.querySelector(
	".responsive-table__head__title--country"
) as HTMLElement;

// Select tbody text from Dom
const bodyTextName = document.querySelectorAll(
	".responsive-table__body__text--name"
) as NodeListOf<HTMLElement>;
const bodyTextStatus = document.querySelectorAll(
	".responsive-table__body__text--status"
) as NodeListOf<HTMLElement>;
const bodyTextTypes = document.querySelectorAll(
	".responsive-table__body__text--types"
) as NodeListOf<HTMLElement>;
const bodyTextUpdate = document.querySelectorAll(
	".responsive-table__body__text--update"
) as NodeListOf<HTMLElement>;
const bodyTextCountry = document.querySelectorAll(
	".responsive-table__body__text--country"
) as NodeListOf<HTMLElement>;

// Select all tbody table row from Dom
const totalTableBodyRow = document.querySelectorAll(
	".responsive-table__body .responsive-table__row"
) as NodeListOf<HTMLElement>;

// Get thead titles and append those into tbody table data items as a "data-title" attribute
for (let i = 0; i < totalTableBodyRow.length; i++) {
	bodyTextName[i].setAttribute("data-title", headTitleName.innerText);
	bodyTextStatus[i].setAttribute("data-title", headTitleStatus.innerText);
	bodyTextTypes[i].setAttribute("data-title", headTitleTypes.innerText);
	bodyTextUpdate[i].setAttribute("data-title", headTitleUpdate.innerText);
	bodyTextCountry[i].setAttribute("data-title", headTitleCountry.innerText);
}

      
    });
  }
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  addEquipe(form: NgForm): void {
    const nouvelleEquipe: Equipe = {
      idEquipe: null,
      nomEquipe: form.value.nomEquipe,
      numTel: form.value.numTel,
      nbEquipe: form.value.nbEquipe,
      zone_dispo: form.value.zone_dispo,
      dateDebut: form.value.dateDebut,
      dateFin: form.value.dateFin,
      email: form.value.email,
      sepcialite: form.value.sepcialite,
      user: form.value.user
    };

    this.equipeService.addEquipe(nouvelleEquipe).subscribe(equipe => {
      this.equipes.push(equipe);
      form.resetForm();
      this.afficherFormulaire = false;
      this.equipeSelectionnee = equipe;  
    });
  }
  deleteEquipe(id: number): void {
    this.equipeService.deleteEquipe(id).subscribe(() => {
      this.equipes = this.equipes.filter(equipe => equipe.idEquipe !== id);
      this.equipeSelectionnee = null;
    });
  }
 
  modifierEquipe(form: NgForm): void {
    const equipeModifiee: Equipe = {
      idEquipe: this.equipeSelectionnee.idEquipe,
      nomEquipe: this.equipeSelectionnee.nomEquipe,
      numTel: this.equipeSelectionnee.numTel,
      nbEquipe: this.equipeSelectionnee.nbEquipe,
      zone_dispo: this.equipeSelectionnee.zone_dispo,
      dateDebut:this.equipeSelectionnee.dateDebut,
      dateFin:this.equipeSelectionnee.dateFin,
      email: this.equipeSelectionnee.email,
      sepcialite: this.equipeSelectionnee.sepcialite,
      user: this.equipeSelectionnee.user
    };
  
    this.equipeService.updateEquipe(equipeModifiee).subscribe(equipe => {
      const index = this.equipes.findIndex(e => e.idEquipe === equipe.idEquipe);
      this.equipes[index] = equipe;
      this.equipeSelectionnee = equipe;
      this.view = 'table';
    });
    this.afficherModifierFormulaire = true;
  }
  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  
  fermerFormulaire() {
    this.afficherModifierFormulaire = false;
  }
  annuler() {
    this.afficherFormulaire = false;
  this.view = 'table';
  }
  annulermodifier() {
    this.afficherModifierFormulaire = false;
  this.view = 'table';
  }
  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
  }
}
