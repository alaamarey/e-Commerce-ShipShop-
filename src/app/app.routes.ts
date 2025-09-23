import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../core/layout/auth-layout/auth-layout.component';
import { SignupComponent } from '../core/auth/signup/signup.component';
import { LoginComponent } from '../core/auth/login/login.component';
import { BlankLayoutComponent } from '../core/layout/blank-layout/blank-layout.component';
import { HomeComponent } from '../features/home/home.component';
import { ProductsComponent } from '../features/products/products.component';
import { BrandsComponent } from '../features/brands/brands.component';
import { CategroiesComponent } from '../features/categroies/categroies.component';
import { DetailsComponent } from '../features/details/details.component';
import { AboutComponent } from '../features/about/about.component';
import { ContactComponent } from '../features/contact/contact.component';
import { CartComponent } from '../features/cart/cart.component';
import { NotFoundComponent } from '../features/not-found/not-found.component';
import { isLoggedGuard } from '../core/guards/is-logged-guard';
import { authUserGuard } from '../core/guards/auth-user-guard';
import { PaymentComponent } from '../features/payment/payment.component';
import { AllordersComponent } from '../features/allorders/allorders.component';
import { WishlistComponent } from '../features/wishlist/wishlist.component';
import { ForgotpasswordComponent } from '../core/auth/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from '../features/changepassword/changepassword.component';
import { productresolverResolver } from '../shared/resolver/productresolver-resolver';
import { cartResolver } from '../features/cart/resolver/cart-resolver';
import { wishlistResolver } from '../features/wishlist/resolver/wishlist-resolver';
import { brandsResolver } from '../shared/resolver/brands-resolver';
import { categroyResolver } from '../shared/resolver/categroy-resolver';
import { detailsResolver } from '../features/details/resolver/details-resolver';

export const routes: Routes = [

    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },

    {
        path: '', component: AuthLayoutComponent,

        children: [
            {
                path: 'signup', component: SignupComponent, title: 'SIGNUP'
            },
            {
                path: 'login', component: LoginComponent, title: 'LOGIN'
            },
            {
                path: 'forgotpassword', component: ForgotpasswordComponent, title: 'FORGOTPASSWORD'
            }
        ]
    },

    {
        path: '', component: BlankLayoutComponent,
        canActivate: [isLoggedGuard],
        canDeactivate: [authUserGuard],
        children: [
            {
                path: 'home', loadComponent: () => import('../features/home/home.component').then((C) => C.HomeComponent), title: 'HOME', resolve: {
                    product: productresolverResolver,
                    brand: brandsResolver,
                    categroy: categroyResolver
                }
            },
            {
                path: 'products', component: ProductsComponent, title: 'PRODUCT', resolve: { product: productresolverResolver }
            },
            {
                path: 'brands', component: BrandsComponent, title: 'BRAND', resolve: { brand: brandsResolver, }
            },
            {
                path: 'categroy', component: CategroiesComponent, title: 'CATEGROY', resolve: { categroy: categroyResolver }
            },
            {
                path: 'cart', component: CartComponent, title: 'CART', resolve: { cart: cartResolver }
            },
            {
                path: 'details/:slug/:id', component: DetailsComponent, title: 'Details', resolve: { details: detailsResolver }
            },
            {
                path: 'about', component: AboutComponent, title: 'ABOUT'
            },
            {
                path: 'contact', component: ContactComponent, title: 'CONTACT'
            },
            {
                path: 'payment/:cartId', component: PaymentComponent, title: 'PAYMENT'
            },
            {
                path: 'allorders', component: AllordersComponent, title: 'AllORDERS'
            },
            {
                path: 'wishlist', component: WishlistComponent, title: 'WISHLIST', resolve: { wishlist: wishlistResolver }
            },
            {
                path: 'changepassword', component: ChangepasswordComponent, title: 'CHANGE PASSWORD '
            },

            {
                path: '**', component: NotFoundComponent, title: 'NOT FOUND'
            },

        ]
    }





];
