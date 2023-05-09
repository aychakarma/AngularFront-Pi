import { Component } from '@angular/core';
import { Equipe } from 'src/app/equipe';
import { EquipeService } from 'src/app/equipe.service';
@Component({
  selector: 'app-dashboard-s',
  templateUrl: './dashboard-s.component.html',
  styleUrls: ['./dashboard-s.component.scss']
})
export class DashboardSComponent {
  equipeList: Equipe[] = [];
  nomEquipe: string = '';
  showErrorMessage: boolean = false;


  constructor(private equipeService: EquipeService) {}

  ngOnInit(): void {
    this.equipeService.chercherParNom('').subscribe(
      data => {
        this.equipeList = data;
      }
    );
  }

  chercherEquipes(nomEquipe: string): void {
    this.equipeService.chercherParNom(nomEquipe).subscribe(
      data => {
        if (data.length > 0) {
          this.equipeList = data;
          this.showErrorMessage = false;
        } else {
          this.equipeList = [];
          this.showErrorMessage = true;
        }
      }
    );
  }
  checkInput() {
    if (this.nomEquipe && this.nomEquipe.trim().length > 0) {
      // Si l'utilisateur a commencé à taper quelque chose, masquer le message d'erreur
      this.showErrorMessage = false;
    } else {
      // Sinon, afficher le message d'erreur
      this.showErrorMessage = true;
    }
  }
  checkInputValue() {
    this.showErrorMessage = !this.nomEquipe?.trim();
  }
  
}
