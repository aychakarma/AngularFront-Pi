import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { DashboardSComponent } from './dashboard/dashboard-s/dashboard-s.component';


@NgModule({
  declarations: [AppComponent, DashboardSComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule,FormsModule, ModalModule.forRoot(), ToastrModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
