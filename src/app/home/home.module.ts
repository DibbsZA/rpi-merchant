import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

import { HistoryComponent } from './history/history.component';
import { PosComponent } from './pos/pos.component';
import { ShowQrComponent } from './pos/show-qr/show-qr.component';
import { TicketComponent } from './ticket/ticket.component';
import { HomeComponent } from './home.component';
import { LineItemModalComponent } from './history/line-item-modal/line-item-modal.component';
import { TransactionsComponent } from './transactions/transactions.component';

import {
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule
} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ReportsComponent } from './reports/reports.component';
import { LineChartComponent } from './reports/line-chart/line-chart.component';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { QRCodeModule, QRCodeComponent } from "angularx-qrcode";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatTabsModule,
        MatSelectModule,
        MatListModule,
        MatDividerModule,
        MatGridListModule,
        AppRoutingModule,
        FormsModule,
        ChartsModule,
        QRCodeModule
    ],
    declarations: [
        HomeComponent,
        TicketComponent,
        LineItemModalComponent,
        PosComponent,
        ShowQrComponent,
        HistoryComponent,
        TransactionsComponent,
        ReportsComponent,
        LineChartComponent,
        ShowQrComponent
    ],
    entryComponents: [
        LineItemModalComponent,
        ShowQrComponent
    ]
})
export class HomeModule { }
