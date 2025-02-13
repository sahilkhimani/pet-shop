import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { PetModel } from '../../models/pet.model';
import { StaticClass } from '../../utility/helper/static-words';
import { LocalStorageService } from '../../utility/services/local-storage.service';
import { WishlistItemComponent } from "./wishlist-item/wishlist-item.component";

@Component({
  selector: 'app-wishlist',
  imports: [
    WishlistItemComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) { }
  wishlist: PetModel[] = [];
  ngOnInit(): void {
    this.wishlist = this.localStorageService.getItem<PetModel[]>(StaticClass.wishlist) || [];
  }
  removeItem(petId: number) {
    this.wishlist = this.wishlist.filter(item => item.PetId !== petId)
  }
}
