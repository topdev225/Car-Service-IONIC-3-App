import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginProvider} from '../../providers/login/login';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  public userId:string;
  constructor(public http: HttpClient, public loginProvider: LoginProvider) {
    console.log('Hello GetserviceHistoryProvider Provider');
    
  }
  getProfileData(){
    this.userId = this.loginProvider.getUserId();

    let data:any;
      data = new FormData();
        data.append("id", this.userId);
      return this.http.post('http://localhost/application/User_my_account/user_data',data).map(res => res);
  }

}
