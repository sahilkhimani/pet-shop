import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { SnackbarService } from '../../utility/services/snackbar.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from "../../product/product.component";
import { CategoryComponent } from "../../category/category.component";
import { PetModel } from '../../models/pet.model';
import { LoaderComponent } from "../../utility/loader/loader.component";
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { HeaderComponent } from '../../components/header/header.component';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';
import { SliderComponent } from "../../components/slider/slider.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CategoryService } from '../../utility/services/category.service';

@Component({
  selector: 'app-main-page',
  imports: [
    CommonModule,
    HeaderComponent,
    ProductComponent,
    CategoryComponent,
    LoaderComponent,
    LoginModalComponent,
    SliderComponent,
    FooterComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit, AfterViewInit {
  petsList: PetModel[] = [];
  isLoading: boolean = false;
  filteredList: PetModel[] = [];
  
  constructor(
    private petService: PetService,
    private snackbarService: SnackbarService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private categService: CategoryService
  ) { }

  @ViewChild('productSection') productSection?: ElementRef;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToSection();
    }, 0)
  }

  scrollToSection() {
    this.productSection?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit(): void {
    this.categService.getPetList().subscribe(
      res => this.filteredList = res
    );
    this.categService.getSelectedCategory()
      .subscribe(res => {
        this.isLoading = true;
        if (res.toLowerCase() != 'others') {
          this.petsList = this.filteredList.filter(
            pet => {
              return res.toLowerCase() === pet.SpeciesName?.toLowerCase()
            }
          );
        }
        else {
          this.getAllPets();
        }
        this.scrollToSection()
        this.isLoading = false;
      })
  }

  getAllPets() {
    this.isLoading = true;
    this.petService.getAll()
      .subscribe({
        next: (response) => {
          this.petsList = response;
          this.categService.setPetList(response);
          this.isLoading = false;
        },
        error: (err) => {
          this.snackbarService.open({ message: err.error, panelClass: ['error-snackbar'] });
          this.isLoading = false;
        }
      })
  }
  setupDialog(dialogName: any) {
    dialogName.showModal();

    this.renderer.listen(dialogName, 'click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.nodeName === "DIALOG") {
        this.dialogClose(dialogName)
      }
    });
  }
  dialogClose(dialogName: any) {
    dialogName.close();
  }
  openLoginModal() {
    const dialog = this.elRef.nativeElement.querySelector("#loginDialogue");
    this.setupDialog(dialog);
  }
  closeLoginDialog() {
    const dialog = this.elRef.nativeElement.querySelector("#loginDialogue");
    this.dialogClose(dialog);
  }

}
