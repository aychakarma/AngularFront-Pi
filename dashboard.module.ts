import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardSavedItemComponent } from './dashboard-saved-item/dashboard-saved-item.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { KeysPipe } from '../keys.pipe';
import { ReclamationComponent } from './reclamation/reclamation.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import { NgApexchartsModule } from "ng-apexcharts";
import { ReclamationAdminComponent } from './reclamation-admin/reclamation-admin.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardIndexComponent,
    DashboardSavedItemComponent,
    DashboardProfileComponent,
    DashboardOrderComponent,
    KeysPipe,
    ReclamationComponent,
    ReclamationAdminComponent,
  ],
  imports: [CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    NgApexchartsModule],
  providers: [
    MatDatepickerModule,
  ],
})
export class DashboardModule {}
