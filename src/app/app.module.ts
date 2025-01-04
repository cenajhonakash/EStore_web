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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center', progressBar: true, closeButton: true }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatProgressBarModule
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