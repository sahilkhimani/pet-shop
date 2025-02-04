import { Routes } from '@angular/router';
import { LoginComponent } from './auth-pages/login/login.component';
import { SignupComponent } from './auth-pages/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { authGuard } from './utility/guard/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StaticClass } from './utility/helper/static-words';
import { WishlistComponent } from './pages/wishlist/wishlist.component';



export const routes: Routes = [
    { path: '', redirectTo: 'main-page', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'main-page', component: MainPageComponent, },
    {
        path: 'product-details',
        component: ProductDetailComponent,
        canActivate: [authGuard],
        data: { role: [StaticClass.buyerRole, StaticClass.sellerRole, StaticClass.adminRole] }
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        data: { role: [StaticClass.sellerRole, StaticClass.adminRole] }
    },
    { path: 'wishlist', component: WishlistComponent, },
    { path: '**', component: NotFoundComponent }
];
