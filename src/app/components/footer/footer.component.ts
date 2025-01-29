import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../utility/services/category.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
  navLinks = HeaderComponent.headerNav;
  constructor(
    private categService : CategoryService,
    private router : Router
  ){}

  categClicked(categName : string){
    this.categService.setSelectedCategory(categName);
    this.router.navigate(['/main-page'])
  }
}
