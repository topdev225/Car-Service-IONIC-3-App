import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginProvider} from '../../providers/login/login';
import { HttpClient } from '@angular/common/http';
import { GetCarProvider } from '../../providers/get-car/get-car';
import { BookServicePage } from '../book-service/book-service';

/**
 * Generated class for the SummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
  
  public data:any;
  public costs:any[] = [];
  public total:any;
  public userId:string;

  constructor(public navCtrl: NavController,public getCarCtrl:GetCarProvider, public loginProvider:LoginProvider,public http:HttpClient, public navParams: NavParams, public view:ViewController) {
    this.data = this.navParams.get('data');
    this.costs = this.navParams.get('cost');
    this.total = this.navParams.get('total');
    this.userId = this.loginProvider.getUserId();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');  
  }
  saveOrder(){

    const orderData = new FormData();
      orderData.append("year",this.data['year']);
      orderData.append("make",this.data['make']);
      orderData.append("model",this.data['model']);
      orderData.append("engine",this.data['engine']);
      orderData.append("vin",this.data['vin']);
      orderData.append("reg_no",this.data['reg_no']);
      orderData.append("value",this.total);
      orderData.append("soil",this.data['soil']);
      orderData.append("sdate",this.data['serviceDate']);
      orderData.append("stime",this.data['serviceTime']);
      orderData.append("oil_change",this.data['oil_change']);
      orderData.append("brake_serv",this.data['brake_serv']);
      orderData.append("fullname",this.data['customerName']);
      orderData.append("address",this.data['serviceAddress']);
      orderData.append("phone_number",this.data['contactPhonenumber']);
      orderData.append("user_id",this.userId);
      return this.http.post("http://localhost/application/User_estimates/save_order_app", orderData).subscribe(val => {
        this.view.dismiss(BookServicePage);
    });  
  }

  closemodal(){
    this.view.dismiss();
    // this.navCtrl.pop();
  }

}
