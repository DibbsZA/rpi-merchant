import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Item, Order } from '../../core/item';
import { PosService } from '../../core/pos.service';
import { DatabaseService } from '../../core//database.service';
import { MatTabsModule } from '@angular/material';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {
  products = [];
  productTypes = ['Meals', 'Food', 'Drink', 'Snacks'];
  ticket: Item[];
  cartTotal = 0;
  cartNumItems = 0;
  items;

  constructor(private ticketSync: PosService, private db: DatabaseService) {}

  ngOnInit() {
    this.ticketSync.currentTicket.subscribe(data => (this.ticket = data));
    this.ticketSync.currentTotal.subscribe(total => (this.cartTotal = total));
    this.ticketSync.currentCartNum.subscribe(num => this.cartNumItems);
    this.products[0] = this.db.getMeals();
    this.products[1] = this.db.getFood();
    this.products[2] = this.db.getDrink();
    this.products[3] = this.db.getSnaks();
  }

  addToCheck(item: Item) {
    // If the item already exists, add 1 to quantity
    if (this.ticket.includes(item)) {
      this.ticket[this.ticket.indexOf(item)].quantity += 1;
    } else {
      this.ticket.push(item);
    }
    this.calculateTotal();
  }

  // Calculate cart total
  calculateTotal() {
    let total = 0;
    let cartNum = 0;
    // Multiply item price by item quantity, add to total
    this.ticket.forEach(function(item: Item) {
      total += item.price * item.quantity;
      cartNum += item.quantity;
    });
    this.cartTotal = total;
    this.cartNumItems = cartNum;
    this.ticketSync.updateNumItems(this.cartNumItems);
    this.ticketSync.updateTotal(this.cartTotal);
  }

  syncTicket() {
    this.ticketSync.changeTicket(this.ticket);
  }
}
