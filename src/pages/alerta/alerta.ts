import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-alerta',
  templateUrl: 'alerta.html',
})
export class AlertaPage {

  coordenadas:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _us: UsuarioProvider) {

      this.coordenadas = {
        "latitude": navParams.data.ubicacion.latitude,
        "longitude": navParams.data.ubicacion.longitude
      };
      console.log(this.coordenadas);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertaPage');
  }

  notInRisk(){
    console.log(this.coordenadas);
    this._us.notInRisk(this.coordenadas);
  }

  isInRisk(){
    console.log(this.coordenadas);
    this._us.isInRisk( this.coordenadas );
  }

}
