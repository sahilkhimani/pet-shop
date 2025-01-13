import { Component, Input } from '@angular/core';
import { CategModel } from '../../models/categ.model';

@Component({
  selector: 'app-category-item',
  imports: [],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.css'
})
export class CategoryItemComponent {
  @Input() item: CategModel = {name : '', img : ''};
}
