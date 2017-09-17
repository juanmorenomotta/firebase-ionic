import { Injectable } from '@angular/core';
//firebase
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';

@Injectable()
export class EpicentroProvider {

  //epicentro: FirebaseListObservable<any[]>;
  epicentro:any = "";
  constructor(public afDB: AngularFireDatabase) {

  }

  obtener_epicentro( ){
      this.epicentro = this.afDB.object('/epicentro');
      this.epicentro.$ref.on("value", ( snap ) => {
        console.log( snap.val() );
      });

  }

}
