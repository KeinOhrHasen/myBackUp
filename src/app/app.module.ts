import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// import Browser Animation and Angular Material molules
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatSidenavModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

// Authorization Service
import { AuthService } from "./shared/services/auth/auth.service";


@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    // firebase modulesl
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,

    // Angular Material Modules and BrowserAnimations Module
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,

    

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
