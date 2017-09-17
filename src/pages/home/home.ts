import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';

import { AlertaPage } from '../../pages/alerta/alerta';

import { App, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  alertar:boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _ubicacion: UbicacionProvider,
              public viewCtrl: ViewController,
              public appCtrl: App) {
    console.log(this._ubicacion.isInRisk);
    if ( this._ubicacion.iniciar_localizacion()) {
      this.navCtrl.push( AlertaPage, { "ubicacion": this._ubicacion } );
    }
  }

  alerta(){
    this.navCtrl.push( AlertaPage,{ "ubicacion": this._ubicacion } );
  }

}
