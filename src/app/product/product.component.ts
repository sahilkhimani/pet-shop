import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PetModel } from '../models/pet.model';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() petItem? : PetModel;
}
