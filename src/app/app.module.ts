import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AlertaPage} from '../pages/alerta/alerta';

// servicios Providers
import { UsuarioProvider } from '../providers/usuario/usuario';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from "../config/firebase.config";

//storage
import { IonicStorageModule } from '@ionic/storage';

//plugins
import { Geolocation } from '@ionic-native/geolocation';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { EpicentroProvider } from '../providers/epicentro/epicentro';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AlertaPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AlertaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    Geolocation,
    UbicacionProvider,
    EpicentroProvider
  ]
})
export class AppModule {}
