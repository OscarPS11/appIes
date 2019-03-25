import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Evento } from '../../core/models/evento';

@Injectable()
export class NotificationProvider {

  constructor(public http: HttpClient, public notification: LocalNotifications) {
    console.log('Hello NotificationProvider Provider');
  }


  createNotification(evento: Evento) {
    var options = {
      title: evento.tittle,
      text: evento.description,
      trigger: { at: new Date(evento.date) },
      data: { mydata: 'Motificacion' },
      smallIcon: "res://smallicon.png",
      icon: "res://icon.png",
      color: '#012be2'
    }
    this.notification.schedule(options);
  }

}
