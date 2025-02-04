import { PetModel } from "../../models/pet.model";

export abstract class StaticClass {
    //localstorage variables
    static token: string = 'token';
    static role: string = 'role';
    static wishlist : string = 'wishlist'
    static expiryTime : string = 'expiryTime';
    static userId : string = 'userId';

    //snackbar panel classes names
    static sucSnackbar = 'suc-snackbar';
    static errorSnackbar = 'error-snackbar';

    //roles names
    static sellerRole = 'Seller';
    static buyerRole = 'Buyer';
    static adminRole = 'Admin';

    //routes names
    static mainPage = '/main-page'
    static loginPage = '/login'
    static notFoundPage = '/not-found'
    static dashboardPage = '/dashboard'
    static wishlistPage = '/wishlist'
}
