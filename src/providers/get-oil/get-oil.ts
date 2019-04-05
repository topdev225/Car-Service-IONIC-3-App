import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginProvider } from '../login/login';

/*
  Generated class for the GetOilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetOilProvider {
  
  public userId:string;
  
  constructor(public http: HttpClient, public loginProvider:LoginProvider) {
    console.log('Hello GetOilProvider Provider');
  }
  public getOilData(){
    this.userId = this.loginProvider.getUserId();

    let data:any;
      data = new FormData();
        data.append("id", this.userId);
      return this.http.post('http://localhost/application/Home/search_oil',data).map(res => res);
  }
  public getEstimate(id){
    let data:any;
      data = new FormData();
        data.append("data", id);
      return this.http.post('http://localhost/application/Home/get_estimate',data).map(res => res);

  }

}
