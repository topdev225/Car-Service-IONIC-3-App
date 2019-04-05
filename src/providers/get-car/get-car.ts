import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginProvider} from '../../providers/login/login';

/*
  Generated class for the GetCarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetCarProvider {
  public userId:string;
  constructor(public http: HttpClient,public loginProvider:LoginProvider) {
    console.log('Hello GetCarProvider Provider');
  }
  getCarData(){
    this.userId = this.loginProvider.getUserId();

    let data:any;
      data = new FormData();
        data.append("id", this.userId);
      return this.http.post('http://localhost/application/User_vehicles/getUserVechicleDetails',data).map(res => res);
  }

}
