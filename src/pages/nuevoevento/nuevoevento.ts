import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Evento } from '../../core/models/evento';
import { NotificationProvider } from '../../providers/notification/notification';
import { AlmacenamientoProvider } from '../../providers/almacenamiento/almacenamiento';

@IonicPage()
@Component({
  selector: 'page-nuevoevento',
  templateUrl: 'nuevoevento.html',
})
export class NuevoeventoPage {
  eventosModal: Array<Evento> = [];

  tittleEvento: string;
  descriptionEvento: string;
  date: number;
  month: number;
  year: number;
  horaEvento: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public notification: NotificationProvider, public almacen: AlmacenamientoProvider) {
    this.date = this.viewCtrl.getNavParams().get('date');
    this.month = this.viewCtrl.getNavParams().get('month');
    this.year = this.viewCtrl.getNavParams().get('year');
    this.eventosModal = this.viewCtrl.getNavParams().get('eventos');
  }

  save() {
    if (this.tittleEvento.length > 0 && this.descriptionEvento.length > 0 && this.horaEvento.length > 0) {
      let evento = new Evento(new Date(this.year, this.month, this.date, Number.parseInt(this.horaEvento.substring(0, 2)), Number.parseInt(this.horaEvento.substring(3, 5))), this.tittleEvento, this.descriptionEvento);
      this.notification.createNotification(evento);
      this.eventosModal.push(evento);
      this.viewCtrl.dismiss(this.eventosModal);
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

}
