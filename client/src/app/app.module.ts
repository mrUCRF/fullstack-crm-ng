import { MaterialService } from 'src/app/shared/classes/material.service';
import { CategoriesService } from './shared/services/categories.service';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { PositionsService } from './shared/services/positions.service';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { PositionsFormComponent } from './categories-page/categories-form/positions-form/positions-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    AnalyticsPageComponent,
    CategoriesPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    OverviewPageComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CategoriesService,
    PositionsService,
    MaterialService,
    // OrdersService,
    // AnalyticsService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
