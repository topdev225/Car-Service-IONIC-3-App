import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


import { LoginProvider } from '../../providers/login/login';
/*
  Generated class for the GetserviceHistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetserviceHistoryProvider {

  public userId:string;
  constructor(public http: HttpClient, public loginProvider: LoginProvider) {
    console.log('Hello GetserviceHistoryProvider Provider');
    
  }
  getServiceHistoryData(){
    this.userId = this.loginProvider.getUserId();

    let data:any;
      data = new FormData();
        data.append("userId", this.userId);

      return this.http.post('http://localhost/application/Service_history/user_service_history_app',data).map(res => res);
  }
}
