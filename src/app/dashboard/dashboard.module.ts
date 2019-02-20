import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule, MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { DashbouardNavComponent } from './components/dashbouard-nav/dashbouard-nav.component';
import { BackBarModule } from './components/back-bar/back-bar.module';


@NgModule({
  declarations: [
    DashboardComponent,
    DashbouardNavComponent,
    ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    BackBarModule,

    
  ]
})
export class DashboardModule { }
