import { Component } from '@angular/core';
import { CategoryItemComponent } from "./category-item/category-item.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [CategoryItemComponent, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

}
