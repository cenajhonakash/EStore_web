import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';

const routes: Routes = [
  {
    path: "home", component: HomeComponent, title: "Home | Estore"
  }, {
    path: "login", component: LoginComponent, title: "Estore | Login"
  }, {
    path: "register", component: SignupComponent, title: "Estore | Signup"
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
