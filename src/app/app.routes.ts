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
import { AllusersComponent } from './pages/dashboard/allusers/allusers.component';
import { OrderHistoryComponent } from './pages/dashboard/order-history/order-history.component';
import { MypetComponent } from './pages/dashboard/mypet/mypet.component';
import { AddpetComponent } from './pages/dashboard/mypet/addpet/addpet.component';
import { BreedComponent } from './pages/dashboard/breed/breed.component';
import { SpeciesComponent } from './pages/dashboard/species/species.component';



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
                canActivate: [authGuard],
                data: { role: [StaticClass.buyerRole, StaticClass.adminRole] }
            },
            {
                path: 'order-history',
                component: OrderHistoryComponent,
                canActivate: [authGuard],
                data: { role: [StaticClass.sellerRole, StaticClass.adminRole] }
            },
            {
                path: 'all-user',
                component: AllusersComponent,
                canActivate: [authGuard],
                data: { role: [StaticClass.adminRole] }
            },
            {
                path: 'my-pet',
                component: MypetComponent,
                canActivate: [authGuard],
                data: { role: [StaticClass.adminRole, StaticClass.sellerRole] }
            },
            {
                path: 'breed',
                component: BreedComponent,
                canActivate: [authGuard],
                data: { role: [StaticClass.adminRole] }
            },
            {
                path: 'species',
                component: SpeciesComponent,
                canActivate: [authGuard],
                data: { role: [StaticClass.adminRole] }
            },
            {
                path: 'add-pet',
                component: AddpetComponent,
                canActivate: [authGuard],
                data: { role: [StaticClass.adminRole, StaticClass.sellerRole] }
            },
        ],
        data: { role: [StaticClass.sellerRole, StaticClass.adminRole, StaticClass.buyerRole] }
    },
    { path: 'wishlist', component: WishlistComponent, },
    { path: '**', component: NotFoundComponent }
];
