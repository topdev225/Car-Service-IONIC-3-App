import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ModalOptions } from 'ionic-angular';

import { SummaryPage } from '../summary/summary';
import { LoginProvider } from '../../providers/login/login';
import { GetCarProvider } from '../../providers/get-car/get-car';
import { GetOilProvider } from '../../providers/get-oil/get-oil';
import { ProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the BookServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-book-service',
  templateUrl: 'book-service.html',
})
export class BookServicePage {
 
  public summaryData:any;

  public cars:any;
  public oils:any;
  public costs:any[] = [];
  public estimate:any;
  public total:any = 0;
  public temptotal:any = 0;
  
  public selectedEngineOil:string;
  public selectedVehicle:string;
  public selectServiceDate:string;
  public selectedTime:string;
  public oilChecked:boolean;
  public brakeChecked:boolean;
  public selectedAddress:string;

  public customName:string;
  public serviceAddressTemp:string;
  public serviceAddress:string;
  public phoneNumber:string;
  public oilCheckedState:boolean;
  public brakeCheckedChange:boolean;
  public altAddress:string;

  public isEnabledOil:boolean;
  public isEnabledBrake:boolean;
  public isEnabledAlt:boolean;
  public isEnabledPhoneAlt: boolean;
  public selectedPhonenumber: string;
  public servicePhone: string;
  public altPhone: string;
  public oil_change: string;
  public brake_serve: string;
  public sOil: string;
  public vehicle: string;
  public car_make: any;
  public car_name: any;
  public car_trim: any;
  public car_year: any;
  public customer_id: any;
  public registration_number: any;
  public vin: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public getCarCtrl:GetCarProvider, public loginProvider:LoginProvider,public getProfileData:ProfileProvider, public getOilCtrl:GetOilProvider, private myModal:ModalController) {
    // this.userId = this.loginProvider.getUserId();
    // // const userInfo = new FormData();
    // //             userInfo.append("userId",this.userId);
            
    getCarCtrl.getCarData().subscribe(data => {
      this.cars = data;
      console.log(this.cars);
    });
    getOilCtrl.getOilData().subscribe(data => {
      this.oils = data;
      console.log(this.oils);
    });
    getProfileData.getProfileData().subscribe(data => {
      console.log(data);
      this.customName = data[0].first_name +" "+ data[0].last_name;
      this.serviceAddressTemp = data[0].address1;
    
      this.phoneNumber = data[0].phone;
    });

  }

  carFn(event){
    this.car_make = event.car_make;
    this.car_name = event.car_name;
    this.car_trim = event.car_trim;
    this.car_year = event.car_year;
    this.customer_id = event.customer_id;
    this.registration_number = event.registration_number;
    this.vin = event.vin;
  }

  engineFn(){
    this.getOilCtrl.getEstimate(this.selectedEngineOil).subscribe(data => {
      console.log(data[0]);
      this.costs.push({
        name:data[0].name,
        service_charge:data[0].service_charge
      })
      this.sOil = data[0].id;

      this.total = parseInt(data[0].service_charge);
      this.temptotal = parseInt(data[0].service_charge);

    });
  }

  oilState(){
    this.oilCheckedState = this.oilChecked;
    if(this.oilCheckedState == false)
    {
      this.isEnabledOil = true;
      this.oil_change = "";
    }    
    else{
      this.isEnabledOil = false;
      this.oil_change = "you provide oil and filter";
    }
    // console.log(this.oilCheckedState);
  }

  brakeState(){
    this.brakeCheckedChange = this.brakeChecked;
    if(this.brakeCheckedChange == false)
    {
      this.isEnabledBrake = true;
      this.brake_serve = "";
    }    
    else{
      this.isEnabledBrake = false;
      this.brake_serve = "you provide brake oil and brake pad";
    }
  }
  
  defaultSel(){
    this.isEnabledAlt=true;
  }
  alterSel(){
    this.isEnabledAlt=false;
  }
  defaultPhoneSel(){
    this.isEnabledPhoneAlt=true;
  }
  alterPhoneSel(){
    this.isEnabledPhoneAlt=false;
  }
  openModal(){
    this.costs = [];
    this.engineFn();
    const modaloptions: ModalOptions = {
      enableBackdropDismiss: false
    }
    
    if(this.selectedAddress == "default")
    {

      this.serviceAddress = this.serviceAddressTemp;
    }
    if(this.selectedAddress == "alt")
    {

      this.serviceAddress = this.altAddress;
    }
    if(this.selectedPhonenumber == "defaultPhone")
    {

      this.servicePhone = this.phoneNumber;
    }
    if(this.selectedPhonenumber == "altPhone")
    {

      this.servicePhone = this.altPhone;
    }
    
    this.summaryData ={
      "customerName" : this.customName,
      "vehicle" : this.selectedVehicle,
      "serviceDate" : this.selectServiceDate,
      "serviceTime" : this.selectedTime,
      "serviceAddress" : this.serviceAddress,
      "contactPhonenumber" : this.servicePhone,
      "oil_change" : this.oil_change,
      "brake_serv" : this.brake_serve,
      "soil" : this.sOil,
      "year" : this.car_year,
      "make" : this.car_make,
      "model" : this.car_name,
      "engine" : this.car_trim,
      "vin" : this.vin,
      "reg_no" : this.registration_number
    } 
    
    this.total = this.temptotal;
    if(this.oilCheckedState == true)
    {
      this.costs.push({
        name:"oilChange",
        service_charge:"5000",
      });
      this.total += 5000;
    }
    if(this.brakeCheckedChange == true)
    {
      this.costs.push({
        name:"Brake Service",
        service_charge:"5000",
      });
      this.total += 5000;
    }
    
    
    const modal = this.myModal.create(SummaryPage, {data:this.summaryData, cost:this.costs,total:this.total}, modaloptions);
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookServicePage');
  }

}
