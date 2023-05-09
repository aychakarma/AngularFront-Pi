import { Component, OnInit } from '@angular/core';
import { Equipe } from 'src/app/equipe';
import { EquipeService } from 'src/app/equipe.service';
import { Pesticide ,typePesticide } from 'src/app/pesticide';
import { PesticideService } from 'src/app/pesticide.service';
import { NgForm } from '@angular/forms';
import { Produit } from 'src/app/produit';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'll-doc-index',
  templateUrl: './doc-index.component.html',
  styleUrls: ['./doc-index.component.scss']
})
export class DocIndexComponent implements  OnInit {
  public showButton: boolean = false;
  selectedtype: typePesticide;
  typePesticide: string[] = ['chimique',
   'organique'];
  equipes: Equipe[];
  pesticides: Pesticide[];
  showForm :boolean = false;
  produits: Produit[] = [];
  idUser: number = 2; 
 
  constructor(private equipeService: EquipeService, private pesticideService: PesticideService) {}
  
  ngOnInit(): void {
    this.showForm = false;
    this.equipeService.getProduitsByUser(this.idUser).subscribe(produits => {
      const invalidProduits = produits.filter(p => !p.validite); // filtrer les produits invalides
      if (invalidProduits.length > 0) { // s'il y a des produits invalides
        const answer = confirm('Do you want to transform your products into pesticides ?'); // demander à l'utilisateur
        if (answer) { // si l'utilisateur répond "oui"
          this.showButton = true; // afficher le bouton "Ajouter pesticide"
        } else { // sinon
          this.showButton = false; // cacher le bouton "Ajouter pesticide"
          window.alert(`Alright, see you next time`);

         // afficher un message d'alerte à l'utilisateur
        }
      } else { // s'il n'y a pas de produits invalides
        this.showButton = false; // cacher le bouton "Ajouter pesticide"
        window.alert('Aucun produit invalide.'); // afficher un message d'alerte à l'utilisateur
      }
    });
  }
  onSelectedSaisonChange(event: any) {
    this.selectedtype= event.target.value;
  }
  openPesticideForm(form?: NgForm): void {
    if (form) {
      form.reset();
    }
    this.showForm = true;
  }
  
  
  onSubmit(form: NgForm): void {
    const newPesticide: Pesticide = {
      idPesticide: null,
      typePesticide: form.value.typePesticide,
      choixEquipe: form.value.choixEquipe,
      dateLivraisonPesticide: new Date(form.value.dateLivraisonPesticide),
      user: form.value.idUser
    };
    const idUser = Number(form.value.idUser);
    this.pesticideService.addPesticide(newPesticide, idUser).subscribe(
      result => {
        console.log('Pesticide ajouté avec succès.');
        if (this.pesticides) { // check if this.pesticides is defined
          this.pesticides.push(result);
        } else {
          this.pesticides = [result]; // if not, create it as an array with result as its first element
        }
        form.reset();
        this.showForm = false;
        this.showButton = false; // cacher le bouton "Ajouter pesticide"
        window.alert(`Your pesticide delivery is scheduled for ${newPesticide.dateLivraisonPesticide.toLocaleDateString('fr-FR')}.`);
      },
      error => console.error('Erreur lors de l\'ajout de pesticide :', error)
    );
  }
  
  
  getPesticides(): void {
    this.pesticideService.getPest().subscribe(pesticides => this.pesticides = pesticides);
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.showButton = false;
  }
  
}
