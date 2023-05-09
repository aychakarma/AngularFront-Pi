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
import { DashboardPComponent } from './dashboard-p/dashboard-p.component';
import { FormsModule } from '@angular/forms';
import { KeysPipe } from '../keys.pipe';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import { NgApexchartsModule } from 'ng-apexcharts';
import {ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardIndexComponent,
    DashboardSavedItemComponent,
    DashboardProfileComponent,
    DashboardOrderComponent,
    DashboardPComponent,
    KeysPipe
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, MatMenuModule,FormsModule,MatDialogModule,MatNativeDateModule,MatDatepickerModule,NgApexchartsModule,ReactiveFormsModule,MatSelectModule,MatInputModule,MatButtonModule,MatFormFieldModule]
})
export class DashboardModule {}
