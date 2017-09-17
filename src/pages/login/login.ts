import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from 'ionic-angular';

import { ViewChild, AfterViewInit } from '@angular/core';
import { Slides } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit {

  @ViewChild(Slides) slides: Slides;
  clave:string = "u0";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _us: UsuarioProvider,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ngAfterViewInit(){
      this.slides.lockSwipes(true);
      this.slides.freeMode = false;
      this.slides.paginationType = "progress";
  }

  continuar(){
    let loading = this.loadingCtrl.create({
      content: "Espere por favor..."
    });

    loading.present();

    // Verificar si la clave es valida
    this._us.verifica_usuario( this.clave )
        .then( valido => {
          loading.dismiss();

          if ( valido ){
            //puede continuar a la siguiente pantalla
            this.slides.lockSwipes(false);
            this.slides.slideNext();
            this.slides.lockSwipes(true);
          }else{
            this.alertCtrl.create({
              title: "Clave no es correcta",
              subTitle: "Por favor verifique su clave, o hable con su administrador",
              buttons: ["OK!"]
            }).present();
          }
        })
        .catch( error => {
          loading.dismiss();
          console.log("ERROR en verifica_usuario:" + JSON.stringify(error));
        })
  }

  ingresar(){
    // tenemos clave, ir al home
    //this.navCtrl.setRoot( HomePage );
    this.navCtrl.push( HomePage );
  }


}
