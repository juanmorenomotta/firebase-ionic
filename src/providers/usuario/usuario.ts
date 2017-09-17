import { Injectable } from '@angular/core';
//firebase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
//Storage
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

@Injectable()
export class UsuarioProvider {
  usuario: FirebaseListObservable<any>;
  groups:string[];
  clave:string = null;
  risk:any;

  constructor(public afDB: AngularFireDatabase,
              private storage: Storage,
              private platform: Platform) {

  }

  verifica_usuario( clave:string ){
    clave = clave.toLocaleLowerCase();

    let promesa = new Promise( (resolve, reject)=>{
      this.afDB.list('/users/' + clave)
          .subscribe( data => {

            if ( data.length == 0){
              // la clave no es correcta
              resolve(false);
            } else {
              // la clave es valida
              this.groups = data[1].$value.split(";")
              console.log();
              this.clave = clave;
              this.guardar_storage();
              resolve(true);
            }
          })
    })
    .catch( error => console.log("Error en Promesa Service:" + JSON.stringify(error) ) );

    return promesa;
  }

  guardar_storage(){
    let promesa = new Promise( (resolve, reject) => {

      if ( this.platform.is("cordova") ){
        //dispositivo
        this.storage.set('clave', this.clave );
      }else{
        //escritorio
        if ( this.clave ){
          localStorage.setItem("clave", this.clave);
        }else{
          localStorage.removeItem("clave");
        }
      }
    });

    return promesa;
  }

  cargar_storage(){

    let promesa = new Promise( (resolve, reject) => {
      if ( this.platform.is("cordova") ){
        //dispositivo
        this.storage.ready()
            .then( () => {
              // leer storage
              this.storage.get("clave").then( clave => {
                this.clave = clave;
                resolve();
              })
            })
      }else{
        //escritorio
        this.clave = localStorage.getItem("clave");
        resolve();
      }
    });

    return promesa;
  }

  isInRisk( coords ){
    for(let i in this.groups){
        let group = this.groups[i];
        let estado = {
          "La": coords.latitude ,
          "Lo": coords.longitude,
          "status": 2
        };
        this.risk = this.afDB.list('/risk/' + group);
        this.risk.set("/"+this.clave, estado);
    }
  }

  notInRisk(coords){
    for(let i in this.groups){
        let group = this.groups[i];
        let estado = {
          "La": coords.latitude ,
          "Lo": coords.longitude,
          "status": 0
        };
        this.risk = this.afDB.list('/risk/' + group);
        this.risk.set("/"+this.clave, null);
    }

  }

}
