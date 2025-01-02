import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {path : '', redirectTo : 'login', pathMatch : 'full'},
    {path : 'login', component : LoginComponent},
    {path : 'signup', component : SignupComponent},
    {path : '**', component : NotFoundComponent}
];
