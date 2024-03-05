import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Inventory {
  name: string;
  price: number;
  quantity: number;
  description: string;

  constructor(name: string, price: number, quantity: number, description: string) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
}

export class InventoryService {
  private inventorys: Inventory[] = [
    {
      name: 'GK',
      price: 1000,
      quantity: 2,
      description: 'GK Books',
    },
    {
      name: 'CARS',
      price: 250,
      quantity: 10,
      description: 'CARS BOOKS',
    },
  ];
  inventorysChanged = new Subject<Inventory[]>();

  constructor() {}

  getInventorys() {
    return this.inventorys.slice();
  }

  getInventory(id: number) {
    return this.inventorys[id];
  }

  addInventory(name: string, price: number, quantity: number, description: string) {
    this.inventorys.push({
      name,
      price,
      quantity,
      description,
    });
    this.inventorysChanged.next(this.inventorys.slice());
  }

  updateInventory(
    id: number,
    name: string,
    price: number,
    quantity: number,
    description: string
  ) {
    this.inventorys[id] = {
      name,
      price,
      quantity,
      description,
    };
    this.inventorysChanged.next(this.inventorys.slice());
  }

  deleteInventory(id: number) {
    this.inventorys.splice(id, 1);
    this.inventorysChanged.next(this.inventorys.slice());
  }
}
