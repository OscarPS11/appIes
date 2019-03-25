import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class AlmacenamientoProvider {

  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
    console.log('constructor AlmacenamientoProvider');
  }

  recover(clave: string) {
    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem(clave).then(
        (data) => {
          console.log("recover: ");
          console.log(data);
          resolve(data);
        },
        error => {
          console.log(error);
          reject(error);
        }
      ).catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  storage(clave: string, eventos) {
    this.nativeStorage.setItem(clave, eventos)
      .then(
        () => console.log('Stored item!' + eventos.toString()),
        error => console.error('Error storing item', error)
      );
  }

}
