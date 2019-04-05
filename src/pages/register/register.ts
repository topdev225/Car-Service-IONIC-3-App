import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public firstname: string;
  public lastname: string;
  public username: string;
  public password: string;
  public email: string;
  public phonenumber: string;
  public address: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  onEvent(flag){
    if (flag == 'onRegister')
    {
      const reguserInfo = new FormData();
                reguserInfo.append("first_name",this.firstname);
                reguserInfo.append("last_name",this.lastname);
                reguserInfo.append("username",this.username);
                reguserInfo.append("password",this.password);
                reguserInfo.append("email",this.email);
                reguserInfo.append("phone",this.phonenumber);
                reguserInfo.append("address1",this.address);

      return this.http.post("http://localhost/application/login/registration", reguserInfo).subscribe(val => {
        console.log(val['status']);
        if(val['status'] == "success")
        {
            alert("ok, you are signed up successfully.");
            this.navCtrl.push(LoginPage);
        }
        else
        {
            alert("failed");
        }
    }); 

    }
    if(flag == "onLogin")
    {
      this.navCtrl.push(LoginPage);
    }
  }
}
