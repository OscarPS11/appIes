import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Evento } from '../../core/models/evento';
import { CalendarioProvider } from '../../providers/calendario/calendario';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-Calendario',
  templateUrl: 'Calendario.html'
})
export class CalendarioPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public calendarioProvider: CalendarioProvider, public not: LocalNotifications) {
    console.log("inicio page");
  };

  mostrarDetalles(evento: Evento) {
    this.calendarioProvider.mostrarDetalles(evento)
  }

  onDaySelect($event) {
    this.calendarioProvider.onDaySelect($event);
  }

  add() {
    this.calendarioProvider.add()
  }

  onMonthSelect($event) {
    this.calendarioProvider.onMonthSelect($event);
  }

  public get eventosToView() {
    return this.calendarioProvider.eventosToView;
  }

  public get currentEvents(): Array<any> {
    return this.calendarioProvider.currentEvents;
  }

  public get event(): any {
    return this.calendarioProvider.event;
  }

  public get hayEvento() {
    return this.calendarioProvider.calendario.hayEvento;
  }



}