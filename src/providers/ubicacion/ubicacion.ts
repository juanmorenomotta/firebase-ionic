import { Injectable } from '@angular/core';
//plugin
import { Geolocation } from '@ionic-native/geolocation';

import { EpicentroProvider} from '../../providers/epicentro/epicentro';
import { UsuarioProvider } from '../../providers/usuario/usuario';

//firebase
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';

@Injectable()
export class UbicacionProvider {
  radio:number = 20;
  calculo_distancia:number = 0;
  epicentro:any;
  ubicacion:any;
  posicion:any;
  latitude:number;
  longitude:number;
  risk:any;
  isInRisk:boolean = false;

  constructor( private geolocation: Geolocation,
               public afDB: AngularFireDatabase,
               private _us: UsuarioProvider) {

  }

  iniciar_localizacion(){
    let watch = this.geolocation.watchPosition();
    watch.subscribe( (data) => {

      this.ubicacion = data.coords;
      this.latitude  = this.ubicacion.latitude ;
      this.longitude = this.ubicacion.longitude ;
      let gps = {"La":this.latitude,"Lo":this.longitude};
      console.log(gps);

      this.epicentro = this.afDB.object('/epicentro');
      this.epicentro.$ref.on("value", ( snap ) => {
        var x = snap.val().La - this.ubicacion.latitude;
        var y = snap.val().Lo - this.ubicacion.longitude;
        this.calculo_distancia =  x*x + y*y ;
        console.log(this.calculo_distancia);
        console.log(this.radio*this.radio);
        this.isInRisk = (this.calculo_distancia <= this.radio*this.radio);
        console.log(this.isInRisk);
        if (this.isInRisk){
          for(let i in this._us.groups){
              let group = this._us.groups[i];
              let estado = {
                "La": this.latitude ,
                "Lo": this.longitude,
                "status": 1
              };
              this.risk = this._us.afDB.list('/risk/' + group);
              this.risk.set("/"+this._us.clave, estado);
              console.log('/risk/' + group);
  /*
              // Observamos los grupos
              this.risk = this.afDB.list('/risk/' + group);
              this.risk.$ref.on("child_added", ( snap ) => {
                console.log("Observamos Grupos");
                console.log(snap.val());
              });
  */
          }
        }

      });

    });

    return this.isInRisk;
  }

}
