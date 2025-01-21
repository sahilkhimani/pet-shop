import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { PetModel } from "../../models/pet.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private selectedCategory = new BehaviorSubject<string>('others');
    private petList = new BehaviorSubject<PetModel[]>([]);

    setSelectedCategory(categoryName: string) {
        this.selectedCategory.next(categoryName);
    }

    getSelectedCategory(): Observable<string> {
        return this.selectedCategory;
    }

    setPetList(pets: PetModel[]) {
        this.petList.next(pets);
    }

    getPetList(): Observable<PetModel[]> {
        return this.petList;
    }
}