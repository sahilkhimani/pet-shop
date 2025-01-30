import { Component } from '@angular/core';
import { WishlistItemComponent } from "./wishlist-item/wishlist-item.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { NotFoundComponent } from "../../not-found/not-found.component";
import { PetModel } from '../../models/pet.model';
import { CommonModule } from '@angular/common';

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
export class WishlistComponent {
  wishlist: PetModel[] = [];
}
