import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Evento } from '../../core/models/evento';

@IonicPage()
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {
  public evento: Evento;
  hasNotifications: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.evento = viewCtrl.data;

  }

  actualizarNotificacion() {
    this.evento.notificacion = this.hasNotifications;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  deleteEvent() {
    this.viewCtrl.dismiss(this.evento);
  }

}
