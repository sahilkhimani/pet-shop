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
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';



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
        children: [
            { path: '', component: ProfileDetailsComponent },
            { path: 'profile', component: ProfileComponent },
            {
                path: 'my-orders',
                component: MyOrdersComponent,
                canActivate : [authGuard],
                data: { role: [StaticClass.buyerRole, StaticClass.adminRole] }
            },
            {
                path: 'order-record',
                component: MyOrdersComponent,
                canActivate : [authGuard],
                data: { role: [StaticClass.sellerRole, StaticClass.adminRole] }
            }
        ],
        data: { role: [StaticClass.sellerRole, StaticClass.adminRole, StaticClass.buyerRole] }
    },
    { path: 'wishlist', component: WishlistComponent, },
    { path: '**', component: NotFoundComponent }
];
