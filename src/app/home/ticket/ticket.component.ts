import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Item } from '../../core/item';
import { PosService } from '../../core/pos.service';
import { DatabaseService } from '../../core/database.service';
import { Transaction, QrcodeSpec } from 'src/app/core/interfaces';
import { ShowQrComponent } from '../pos/show-qr/show-qr.component';
import { NotifyService } from 'src/app/core/notify.service';


@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

    ticket: Item[] = [];


    cartTotal = 0;
    cartNumItems = 0;

    constructor(
        private ticketSync: PosService,
        private db: DatabaseService,
        public dialog: MatDialog,
        public notify: NotifyService
    ) { }

    // Sync with ticketSync service on init
    ngOnInit() {
        this.ticketSync.currentTicket.subscribe(data => this.ticket = data);
        this.ticketSync.currentTotal.subscribe(total => this.cartTotal = total);
        this.ticketSync.currentCartNum.subscribe(num => this.cartNumItems = num);
    }

    // Add item to ticket.
    addItem(item: Item) {
        // If the item already exists, add 1 to quantity
        if (this.ticket.includes(item)) {
            this.ticket[this.ticket.indexOf(item)].quantity += 1;
        } else {
            this.ticket.push(item);
        }
        this.syncTicket();
        this.calculateTotal();
    }

    // Remove item from ticket
    removeItem(item: Item) {
        // Check if item is in array
        if (this.ticket.includes(item)) {
            // Splice the element out of the array
            const index = this.ticket.indexOf(item);
            if (index > -1) {
                // Set item quantity back to 1 (thus when readded, quantity isn't 0)
                this.ticket[this.ticket.indexOf(item)].quantity = 1;
                this.ticket.splice(index, 1);
            }
        }
        this.syncTicket();
        this.calculateTotal();
    }

    // Reduce quantity by one
    subtractOne(item: Item) {
        // Check if last item, if so, use remove method
        if (this.ticket[this.ticket.indexOf(item)].quantity === 1) {
            this.removeItem(item);
        } else {
            this.ticket[this.ticket.indexOf(item)].quantity = this.ticket[this.ticket.indexOf(item)].quantity - 1;
        }
        this.syncTicket();
        this.calculateTotal();
    }

    // Calculate cart total
    calculateTotal() {
        let total = 0;
        let cartitems = 0;
        // Multiply item price by item quantity, add to total
        this.ticket.forEach(function (item: Item) {
            total += (item.price * item.quantity);
            cartitems += item.quantity;
        });
        this.cartTotal = total;
        this.cartNumItems = cartitems;
        // Sync total with ticketSync service.
        this.ticketSync.updateNumItems(this.cartNumItems);
        this.ticketSync.updateTotal(this.cartTotal);
    }

    // Remove all items from cart
    clearCart() {
        // Reduce back to initial quantity (1 vs 0 for re-add)
        this.ticket.forEach(function (item: Item) {
            item.quantity = 1;
        });
        // Empty local ticket variable then sync
        this.ticket = [];
        this.syncTicket();
        this.calculateTotal();
    }

    syncTicket() {
        this.ticketSync.changeTicket(this.ticket);
    }

    checkout() {
        if (this.ticket.length > 0) {
            // TODO: This should offer choice for payment by FingerID or RPI
            this.db.pushOrder(this.ticket, this.cartTotal, this.cartNumItems);
            this.clearCart();
        }
    }

    checkoutRPI() {

        if (this.ticket.length > 0) {

            // FIXME: TODO: I should get Order ref from DB but not actually write the entry until the cashier says OK on the QR scan!!!
            // If user pressed Cancel order should be editable still without record in database!!!

            this.db.pushOrder(this.ticket, this.cartTotal, this.cartNumItems)
                .then(orderDoc => {

                    let txDate = new Date().toISOString();
                    let formattedDate = '';
                    formattedDate = txDate.replace('T', ' ').replace('Z', '000');

                    const qrData: QrcodeSpec = {
                        payeeId: 'CANTEEN',
                        payeePsp: 'BSVA_INT',
                        payeeAccount: '1',   // This should be set to ref of the Wallet Account
                        payerId: '',
                        payerPsp: '',
                        userRef: orderDoc.id,
                        amount: this.cartTotal.toFixed(2),
                        originatingDate: formattedDate,
                        extraData: { description: this.cartNumItems + ' items in your cart.' }
                    }

                    const dialogRef = this.dialog.open(ShowQrComponent, {
                        width: '300px',
                        data: qrData
                    });

                    dialogRef.afterClosed()
                        .subscribe(result => {
                            console.log('The dialog was closed: ', result);
                            if ('PAID' === result) {
                                this.clearCart();
                            }

                        });

                })
                .catch(e => {
                    console.log(e);
                    this.notify.update('Error on DB write: ' + JSON.stringify(e), 'error')
                });




        }
    }
}
