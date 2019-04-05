import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';
import { BookServicePage } from '../pages/book-service/book-service';
import { ServiceHistoryPage } from '../pages/service-history/service-history';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { SummaryPage } from '../pages/summary/summary';
import { AddVehiclePage } from '../pages/add-vehicle/add-vehicle';
import { MechanicPage } from '../pages/mechanic/mechanic';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GetserviceHistoryProvider } from '../providers/getservice-history/getservice-history';
import { LoginProvider } from '../providers/login/login';
import { ProfileProvider } from '../providers/profile/profile';
import { GetCarProvider } from '../providers/get-car/get-car';
import { GetOilProvider } from '../providers/get-oil/get-oil';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ProfilePage,
    RegisterPage,
    BookServicePage,
    ServiceHistoryPage,
    ForgotPasswordPage,
    SummaryPage,
    AddVehiclePage,
    MechanicPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ProfilePage,
    RegisterPage,
    BookServicePage,
    ServiceHistoryPage,
    ForgotPasswordPage,
    SummaryPage,
    AddVehiclePage,
    MechanicPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetserviceHistoryProvider,
    LoginProvider,
    ProfileProvider,
    GetCarProvider,
    GetOilProvider
  ]
})
export class AppModule {}
