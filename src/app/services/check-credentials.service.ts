import { inject, Injectable, OnInit } from "@angular/core";
import { LocalStorageService } from "../utility/services/local-storage.service";
import { StaticClass } from "../utility/helper/static-words";

@Injectable({
    providedIn: 'root'
})
export class CheckCredentialService {
    localStorageService = inject(LocalStorageService);

    checkIfAdmin(role: string): boolean {
        if (role && role === StaticClass.adminRole) {
            return true;
        }
        return false;
    }

    checkIfValidUser(userId: string): boolean {
        const id = this.localStorageService.getItem(StaticClass.userId);
        const role = this.localStorageService.getItem(StaticClass.role);
        if (id === userId || role === StaticClass.adminRole) {
            return true;
        }
        return false;
    }
}