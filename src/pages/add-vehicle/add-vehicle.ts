import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the AddVehiclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-vehicle',
  templateUrl: 'add-vehicle.html',
})
export class AddVehiclePage {
  public cars:any;
  public years:any;
    public selectedYear:string;
    public yearData:string;
  public makes:any;
    public selectedMake:string;
    public makeData:string;
  public models:any;
    public selectedModel:string;
    public modelData:string;
  public trims:any;
    public selectedTrim:string;
    public trimData:string;
  public addData:any;
  public selectedVin:string;
  public selectedRegNumber:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider:LoginProvider, public viewCtrl: ViewController, public http:HttpClient) {
    let yearData:any;
    yearData = new FormData();
      yearData.append("id", "all");
    this.http.post("http://localhost/application/User_my_account/get_year_app",yearData).subscribe(val => {
      this.years = val;
    });  
  
  }

  yearFn(){
    this.makeData = this.selectedYear;
    let makeData:any;
      makeData = new FormData();
      makeData.append("data", this.makeData);
    this.http.post("http://localhost/application/User_vehicles/get_make",makeData).subscribe(val => {
      this.makes = val;
    }); 
  }
  makeFn(){
    this.modelData = this.selectedMake;
    let modelData:any;
    modelData = new FormData();
      modelData.append("year", this.makeData);
      modelData.append("make", this.modelData);
    this.http.post("http://localhost/application/User_vehicles/get_model",modelData).subscribe(val => {
      this.models = val;
    });
  }
  modelFn(){
    this.trimData = this.selectedModel;
    let trimData:any;
    trimData = new FormData();
      trimData.append("year", this.makeData);
      trimData.append("make", this.modelData);
      trimData.append("name", this.trimData)
    this.http.post("http://localhost/application/User_vehicles/get_engine",trimData).subscribe(val => {
      this.trims = val;
    });
  }
  trimFn(){
    this.addData = this.selectedTrim;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');  
  }

  addVehicle(){
    this.cars = [{
      car_make : this.selectedMake,
      car_year : this.selectedYear,
      car_name : this.selectedModel,
      car_trim : this.selectedTrim,
      vin : this.selectedVin,
      registration_number : this.selectedRegNumber
    }];

    const carInfo = new FormData();
        carInfo.append("make",this.selectedMake);
        carInfo.append("name",this.selectedModel);
        carInfo.append("trim",this.selectedTrim);
        carInfo.append("year",this.selectedYear);
        carInfo.append("vin",this.selectedVin);
        carInfo.append("registration_number",this.selectedRegNumber);
        carInfo.append("userId", this.loginProvider.getUserId());

    return this.http.post("http://localhost/application/User_vehicles/add_new_car_app", carInfo).subscribe(val => {
        if(val['status'] == "successfully inserted")
        {
            alert("ok, Add your car successfully.");
            this.viewCtrl.dismiss(this.cars);
        }
        else
        {
            alert("Already Exist");
            this.viewCtrl.dismiss();
        }
      });
    
  }
  closemodal(){
    // this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }
}
