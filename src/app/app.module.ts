import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

import { environment } from '../environments/environment';

import { NotificationComponent } from './notification/notification.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './welcome/login/login.component';
import { ResetpasswordComponent } from './welcome/resetpassword/resetpassword.component';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { MatIconModule, MatButtonModule, MatCardModule, MatMenuModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifyService } from './core/notify.service';
import { PosService } from './core/pos.service';
import { RpiService } from './core/rpi.service';

export const firebaseConfig = environment.firebaseConfig;


@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        NotificationComponent,
        PageNotFoundComponent,
        WelcomeComponent,
        LoginComponent,
        ResetpasswordComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatMenuModule,
        MatInputModule,
        MatFormFieldModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFirestoreModule,
        HomeModule,
        AdminModule
    ],
    providers: [
        NotifyService,
        PosService,
        RpiService,

    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
