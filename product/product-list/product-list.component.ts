import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../produit.service';
import { Observable } from 'rxjs';
import Produit from 'src/app/model/Produit';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
  
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  Produits?: Observable<Produit[]>;
  newProduct: Produit = new Produit();
  categories: string[] = ['legumes', 'fruits'];
  imageUrl: string | undefined;
 imageWidth: number = 100;   
 imageHeight: number = 100;
  ProductToUpdate={
    idproduit:this.newProduct.idproduit,
    nomProduit:"",
    prixProduit:null,
    dataCreation:null,
    dateValidite:null,
    validite:null,
    categorieProduit:"",
    image:""
    
    
  };

  constructor(private produitservice:ProduitService, private router: Router){}

  ngOnInit(): void {
    this.Produits = this.produitservice.getProduitsByUserId(1);
  }
  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
  }

    onAddProduit(): void {
      
      this.produitservice.addproduitbyuser(1, this.newProduct).subscribe(() => {
        // Refresh the list of products
        this.Produits = this.produitservice.getProduitsByUserId(1);
        // Reset the new product form
        this.newProduct = new Produit();
      });
  }

   OnupdateProduit(){
    this.produitservice.updateproduit(this.ProductToUpdate).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  edit(newProduct){
    this.ProductToUpdate=newProduct;
  }

  deleteProduct(newProduct) {
    // Call deleteProduct method from ProductService
    this.produitservice.deleteProduct(newProduct.idproduit).subscribe((resp) => {
 console.log (resp);
         },
         err=>{
          console.log(err);
         }     // Remove deleted product from products array
  );
  
}
onSearchAndFilterSubmit(formValues) {
    this.Produits = this.produitservice.searchAndFilter(formValues.nomProduit,
      formValues.dateCreation, formValues.prixProduit, formValues.dateValidite,
      formValues.validite, formValues.categorieProduit, formValues.quantite);
}

onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    this.newProduct.image = reader.result as string;
  };
  reader.readAsDataURL(file);
}
convertBase64ToImageUrl(base64String: string): string {
  return `data:image/png;base64,${base64String}`;
}

}