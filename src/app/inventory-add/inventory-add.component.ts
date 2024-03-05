import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-add.component.html',
  styleUrl: './inventory-add.component.css',
})
export class AddInventoryComponent {
  constructor(private inventoryService: InventoryService) {}

  onSubmit(form: NgForm) {
    const value = form.value;
    this.inventoryService.addInventory(
      value.name,
      value.price,
      value.quantity,
      value.description
    );
    alert('Inventory added successfully!');
    form.reset();
  }
}
