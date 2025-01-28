import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { LoginComponent } from './components/pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NetworkinterceptorService } from './service/common/networkinterceptor.service';
import { KeycloakService } from './service/security/keycloak.service';
import { CartComponent } from './components/pages/cart/cart.component';
import { WishlistComponent } from './components/pages/wishlist/wishlist.component';
import { OrderHistoryComponent } from './components/pages/order-history/order-history.component';
import { ProductComponent } from './components/pages/product/product.component';
import { StoreManagementComponent } from './components/admin/store-management/store-management.component';
import { StoreManagerDashComponent } from './components/admin/store-manager-dash/store-manager-dash.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { AdmindashComponent } from './components/admin/admindash/admindash.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { ViewCategoriesComponent } from './components/pages/view-categories/view-categories.component';
import { ViewProductsComponent } from './components/pages/view-products/view-products.component';
import { ViewSalesComponent } from './components/admin/view-sales/view-sales.component';
import { ApprovalsComponent } from './components/admin/approvals/approvals.component';
import { StockComponent } from './components/admin/stock/stock.component';
import { ViewOrdersComponent } from './components/pages/view-orders/view-orders.component';
import { IconModule } from './components/common/icon.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    CartComponent,
    WishlistComponent,
    OrderHistoryComponent,
    ProductComponent,
    StoreManagementComponent,
    StoreManagerDashComponent,
    CategoryComponent,
    AdmindashComponent,
    AddProductComponent,
    AddCategoryComponent,
    ViewCategoriesComponent,
    ViewProductsComponent,
    ViewSalesComponent,
    ApprovalsComponent,
    StockComponent,
    ViewOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center', progressBar: true, closeButton: true, timeOut:3000 }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatProgressBarModule,
    IconModule
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS, 
    useClass: NetworkinterceptorService, 
    multi: true
  }, 
  { 
    provide: APP_INITIALIZER, 
    deps: [KeycloakService], 
    useFactory: keyCloakFactory, 
    multi: true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function keyCloakFactory(_kcService: KeycloakService) {
  return () => _kcService.init()
}