import {Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {CartPageComponent} from "./pages/cart-page/cart-page.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {OrderConfirmComponent} from "./pages/order-confirm/order-confirm.component";
import {ProductDetailsComponent} from "./pages/product-details/product-details.component";

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path:'cart', component: CartPageComponent},
  {path:'checkout', component: CheckoutComponent},
  {path: 'confirm', component:OrderConfirmComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: '**', redirectTo: ''}
];
