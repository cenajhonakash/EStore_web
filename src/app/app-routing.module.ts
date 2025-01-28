import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { storeManagementGuardGuard } from './guard/store-management-guard.guard';
import { storeManagerGuardGuard } from './guard/store-manager-guard.guard';
import { StoreManagementComponent } from './components/admin/store-management/store-management.component';
import { StoreManagerDashComponent } from './components/admin/store-manager-dash/store-manager-dash.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { AdmindashComponent } from './components/admin/admindash/admindash.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { ProductComponent } from './components/pages/product/product.component';
import { ViewCategoriesComponent } from './components/pages/view-categories/view-categories.component';
import { ViewProductsComponent } from './components/pages/view-products/view-products.component';
import { ViewSalesComponent } from './components/admin/view-sales/view-sales.component';
import { StockComponent } from './components/admin/stock/stock.component';
import { ViewOrdersComponent } from './components/pages/view-orders/view-orders.component';
import { ApprovalsComponent } from './components/admin/approvals/approvals.component';

const routes: Routes = [
  {
    path: "home", component: HomeComponent, title: "Home | Estore"
  }, {
    path: "login", component: LoginComponent, title: "Estore | Login"
  }, {
    path: "register", component: SignupComponent, title: "Estore | Signup"
  }, {
    path: "cat/all", component: CategoryComponent, title: "Estore | Categories"
  }, {
    path: "admin", component: StoreManagementComponent, title: "Estore | Admin", canActivate: [storeManagementGuardGuard]
    , children: [{ path: "dash", component: AdmindashComponent }, { path: "category", component: AddCategoryComponent }, { path: "product", component: ProductComponent }
      , { path: "categories", component: ViewCategoriesComponent }, { path: "products", component: ViewProductsComponent }, { path: "sales", component: ViewSalesComponent }
      , { path: "stock", component: StockComponent }, { path: "products", component: ViewProductsComponent }, { path: "orders", component: ViewOrdersComponent }
      , { path: "approvals", component: ApprovalsComponent }
    ]
  }, {
    path: "manage", component: StoreManagerDashComponent, title: "Estore | Manage", canActivate: [storeManagerGuardGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
