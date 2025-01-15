import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PetModel } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  @Output() dialogClose: EventEmitter<void> = new EventEmitter();
  productDetail: PetModel = {};
  constructor(private petService: PetService) { }
  ngOnInit(): void {
    console.log("page started " + this.productDetail.BreedId)
    this.productDetail = this.petService.getProductDetail();
  }
  closeDialog() {
    this.dialogClose.emit();
  }
}
