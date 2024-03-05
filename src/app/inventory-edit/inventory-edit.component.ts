import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Inventory, InventoryService } from '../inventory.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inventory-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory-edit.component.html',
  styleUrl: './inventory-edit.component.css',
})
export class EditInventoryComponent {
  @ViewChild('inventoryForm', { static: false }) inventoryForm: NgForm;
  inventoryId: number;
  inventory: Inventory;

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.inventoryId = +params['id'];
      this.inventory = this.inventoryService.getInventory(this.inventoryId);
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    this.inventoryService.updateInventory(
      this.inventoryId,
      value.name,
      value.price,
      value.quantity,
      value.description
    );
    alert('Inventory edited successfully!');
    this.router.navigate(['/']);
  }
}
