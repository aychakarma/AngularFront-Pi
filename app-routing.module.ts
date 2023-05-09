import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/components/layouts/base-layout/base-layout.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { MyCartComponent } from './my-cart/my-cart.component';

const baseLayoutRouting: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  { path: 'MyCart', component: MyCartComponent },
  { path: 'AllProducts', component: ProductDetailsComponent },



];

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: baseLayoutRouting
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'list-produit', component: ProductListComponent },

  {
    path: 'doc',
    loadChildren: () => import('./doc/doc.module').then(m => m.DocModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
