import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetModel } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  @Output() dialogClose: EventEmitter<void> = new EventEmitter();
  @Input() productDetail: PetModel = {};
  constructor(private petService: PetService) { }

  closeDialog() {
    this.dialogClose.emit();
  }
}
