import { Component } from '@angular/core';
import { PetModel } from '../../../models/pet.model';
import { ShortenTextPipe } from "../../../utility/pipes/shorten-text.pipe";

@Component({
  selector: 'app-wishlist-item',
  imports: [ShortenTextPipe],
  templateUrl: './wishlist-item.component.html',
  styleUrl: './wishlist-item.component.css'
})
export class WishlistItemComponent {
  petItem: PetModel = {};
}
