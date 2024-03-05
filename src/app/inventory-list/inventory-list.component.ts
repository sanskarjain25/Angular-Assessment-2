import { Component, OnDestroy, OnInit } from '@angular/core';
import { Inventory, InventoryService } from '../inventory.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css',
})

export class InventoryListComponent implements OnInit, OnDestroy {
  inventorys: Inventory[] = [];
  subscription: Subscription;
  userRole: string = null;
  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.userRole = user.role;
    });
    this.subscription = this.inventoryService.inventorysChanged.subscribe(
      (inventorys: Inventory[]) => {
        this.inventorys = inventorys;
      }
    );
    this.inventorys = this.inventoryService.getInventorys();
    console.log(this.userRole);
  }

  editInventory(id: number) {
    this.router.navigate(['edit-inventory', id]);
  }

  deleteInventory(id: number) {
    if (confirm('Are you sure you want to delete this Item from Inventory?')) {
      this.inventoryService.deleteInventory(id);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSub.unsubscribe();
  }
}
