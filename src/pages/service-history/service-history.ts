import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetserviceHistoryProvider } from '../../providers/getservice-history/getservice-history';

import 'rxjs/add/operator/map';
/**
 * Generated class for the ServiceHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-service-history',
  templateUrl: 'service-history.html',
})
export class ServiceHistoryPage {

  public data:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, gethistoryService:GetserviceHistoryProvider) {
    gethistoryService.getServiceHistoryData().subscribe(data_temp => {
        this.data = data_temp;
        console.log(this.data);
    });
  }

}
