import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ModalOptions } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { GetCarProvider } from '../../providers/get-car/get-car';
import { AddVehiclePage } from '../add-vehicle/add-vehicle';
import { HttpClient } from '@angular/common/http';
import { LoginProvider } from '../../providers/login/login';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  public cars:any;

  public firstName:string;
  public lastName:string;
  public userName:string;
  public new:string;
  public confirm:string;

  constructor( public navCtrl: NavController, public navParams: NavParams,public http:HttpClient, public profileProvider:ProfileProvider,public getCarCtrl:GetCarProvider, public loginProvider:LoginProvider, private myModal:ModalController ) {
    profileProvider.getProfileData().subscribe(data => {
      
        this.firstName = data[0]['first_name'];
        this.lastName = data[0]['last_name'];
        this.userName = data[0]['username'];

      });
    getCarCtrl.getCarData().subscribe(data => {
      this.cars = data;
    });
  }
  openModal(){
    const modaloptions: ModalOptions = {
      enableBackdropDismiss: false
    }
    const modal = this.myModal.create(AddVehiclePage , modaloptions);  
    
    modal.onDidDismiss(cars => {
      if(cars != null)
        {
          if( this.cars == null)
          {
            this.cars = Array.prototype.concat(cars);
          }
          else{
            this.cars = Array.prototype.concat(this.cars, cars);
          }
        }
    });
    modal.present();
  }

  saveUserInfo(){
    const userInfo = new FormData();
        userInfo.append("new",this.new);
        userInfo.append("confirm",this.confirm);
        userInfo.append("first_n",this.firstName);
        userInfo.append("last_n",this.lastName);
        userInfo.append("user_name",this.userName);
        userInfo.append("userId",this.loginProvider.getUserId());
       
      return this.http.post("http://localhost/application/User_my_account/update_user_info_app", userInfo).subscribe(val => {
        if(val['status'] == "Change Sucessfully")
        {
            alert("ok, Update profile successfully.");
        }
        else 
        {
          if(val['status'] == "Password and Confirm password not match")
            alert("Password and Confirm password not match");
        }
      }); 
  }
}
