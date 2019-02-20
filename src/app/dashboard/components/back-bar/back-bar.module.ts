import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule } from '@angular/material';
import { BackBarComponent } from './back-bar.component';
import { RouterModule } from '@angular/router';
// create shared module to share "BackBarComponent"
@NgModule({
  declarations: [BackBarComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
  ],
  exports:[BackBarComponent]
})
export class BackBarModule { }
