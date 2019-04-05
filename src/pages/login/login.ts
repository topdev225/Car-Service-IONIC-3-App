import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { HttpClient } from '@angular/common/http';
import { ProfilePage } from '../profile/profile';

import { LoginProvider } from '../../providers/login/login';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public username: string;
  public password: string;
  constructor(public navCtrl: NavController, public menuCtrl:MenuController, private http:HttpClient, private loginProvider:LoginProvider) {
  menuCtrl.enable(false);
  }

  onEvent(flag){
    if (flag == 'onRegister')
    {
      this.navCtrl.push(RegisterPage);
    }
    if (flag == 'onForgot')
    {
      this.navCtrl.push(ForgotPasswordPage);
    }
    if (flag == 'onLogin')
    {
      const userInfo = new FormData();
                userInfo.append("username",this.username);
                userInfo.append("password",this.password);
      return this.http.post("http://localhost/application/login/login_check", userInfo).subscribe(val => {
          console.log(val[0].status);
          if(val[0].status == "success")
          {
              this.loginProvider.setUserId(val[0].userId);
              this.menuCtrl.enable(true);
              this.navCtrl.push(ProfilePage);
          }
          else
          {
              alert("Invalid username or password");
          }
      });   
    }
 
  }

}
