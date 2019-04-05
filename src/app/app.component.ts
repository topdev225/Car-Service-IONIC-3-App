import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { BookServicePage } from '../pages/book-service/book-service'
import { ServiceHistoryPage } from '../pages/service-history/service-history'
import { MechanicPage } from '../pages/mechanic/mechanic';
import { LoginProvider } from '../providers/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public menuCtrl:MenuController, public statusBar: StatusBar, public splashScreen: SplashScreen, public loginProvider:LoginProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Regist', component: ProfilePage },
      { title: 'Book a service', component: BookServicePage},
      { title: 'Service history', component: ServiceHistoryPage},
      { title: 'Mechanic', component: MechanicPage},
      { title: 'Logout', component: LoginPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // console.log(page);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page['title'] == 'Logout'){
      this.loginProvider.setUserId("");
      this.menuCtrl.enable(false);
    }
    this.nav.setRoot(page.component);
  }
}
