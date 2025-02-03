import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PetModel } from '../../../models/pet.model';
import { ShortenTextPipe } from "../../../utility/pipes/shorten-text.pipe";
import { LocalStorageService } from '../../../utility/services/local-storage.service';
import { StaticClass } from '../../../utility/helper/static-words';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist-item',
  imports: [ShortenTextPipe],
  templateUrl: './wishlist-item.component.html',
  styleUrl: './wishlist-item.component.css'
})
export class WishlistItemComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  @Input() petItem: PetModel = {};
  @Output() removeItem = new EventEmitter<number>();

  removeFavorite(id: number) {
    this.localStorageService.removeFromList<PetModel>(StaticClass.wishlist, (i => i.PetId === id))
    this.removeItem.emit(id);
  }
}
