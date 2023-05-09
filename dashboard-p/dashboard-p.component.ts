import { Component } from '@angular/core';
import { Pesticide } from 'src/app/pesticide';
import { PesticideService } from 'src/app/pesticide.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-dashboard-p',
  templateUrl: './dashboard-p.component.html',
  styleUrls: ['./dashboard-p.component.scss']
})
export class DashboardPComponent {
  headTitleName = document.querySelector(
    ".responsive-table__head__title--name"
  );
  pesticides: Pesticide[];

  constructor(private pesticideService: PesticideService) { }

  ngOnInit() {
    this.getPesticides();
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


 
  }

  getPesticides(): void {
    this.pesticideService.getPest().subscribe(pesticides => this.pesticides = pesticides);
  }

}
