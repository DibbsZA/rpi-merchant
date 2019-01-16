import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import {
    MatIconModule, MatButtonModule, MatCardModule, MatExpansionModule,
    MatInputModule, MatSelectModule, MatCheckboxModule
} from '@angular/material';

import { AdminComponent } from './admin/admin.component';
import { ItemsComponent } from './items/items.component';
import { UsersComponent } from './users/users.component';

import { ParseUserRolePipe } from './parse-user-role.pipe';
import { DatabaseService } from '../core/database.service';
import { AuthService } from '../core/auth.service';

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        FormsModule,
        MatCardModule,
        MatExpansionModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule
    ],
    declarations: [
        AdminComponent,
        ItemsComponent,
        UsersComponent,
        ParseUserRolePipe
    ],
    providers: [
        DatabaseService,
        AuthService
    ]
})
export class AdminModule { }
