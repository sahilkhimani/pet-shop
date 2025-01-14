import { Component } from '@angular/core';
import { CategoryItemComponent } from "./category-item/category-item.component";
import { CommonModule } from '@angular/common';
import { CategModel } from '../models/categ.model';

@Component({
  selector: 'app-category',
  imports: [CategoryItemComponent, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categItems: CategModel[] = [
    {
      name: 'Dog',
      img: 'assets/images/dog-categ.png'
    },
    {
      name: 'Cat',
      img: 'assets/images/cat-categ.png'
    },
    {
      name: 'Birds',
      img: 'assets/images/birds-categ.png'
    },
    {
      name: 'Others',
      img: 'assets/images/other-categ.jpg'
    }
  ]

  onCategClicked(item : CategModel){

  }
}
