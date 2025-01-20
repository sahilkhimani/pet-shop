import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetModel } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CheckProductStatusService } from '../../utility/services/checkProductStatus.service';

@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  providers : [CheckProductStatusService]
})
export class ProductDetailComponent implements OnInit{
  productDetail : PetModel = {};
  noProduct : boolean = false;

  constructor(
    private router : Router,
    private checkStatus : CheckProductStatusService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { product: PetModel };
    this.productDetail = state?.product;
  }
  ngOnInit(): void {
    if(!this.productDetail){
      this.noProduct = true;
    }
  }

  checkProductStatus(status : string){
    return this.checkStatus.checkProductStatus(status);
  }
}
