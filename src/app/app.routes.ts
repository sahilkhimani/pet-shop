import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';

export const routes: Routes = [
    {path : '', redirectTo : 'main-page', pathMatch : 'full'},
    {path : 'login', component : LoginComponent},
    {path : 'signup', component : SignupComponent},
    {path : 'main-page', component : MainPageComponent},
    {path : '**', component : NotFoundComponent}
];
