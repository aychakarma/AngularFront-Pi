import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatExpansionModule} from '@angular/material/expansion';
import { NgParticlesModule } from 'ng-particles';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductHeroComponent } from './product-list/product-hero/product-hero.component';
import { ProduitService } from './produit.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // import FormsModule
import { CommandeService } from '../commande.service';
import { MyCartComponent } from '../my-cart/my-cart.component';



const routes = [
  {
    path: '',
    component: ProductListComponent
  }
];

@NgModule({
  declarations: [ProductListComponent, ProductHeroComponent,ProductDetailsComponent,MyCartComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    MatExpansionModule,
    NgParticlesModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers: [ProduitService,DatePipe,CommandeService]
})
export class ProductModule { }
