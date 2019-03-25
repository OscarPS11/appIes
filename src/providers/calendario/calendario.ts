import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from '../../core/models/evento';
import { ModalController } from 'ionic-angular';
import { EventoPage } from '../../pages/evento/evento';
import { Calendario } from '../../core/models/calendario';
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { NuevoeventoPage } from '../../pages/nuevoevento/nuevoevento';

@Injectable()
export class CalendarioProvider {

  private _calendario: Calendario = new Calendario();
  private _eventosToView: Array<Evento> = [];
  private _event: any;
  private _checkStorageExist: boolean = false;

  private _dateInicio: Date = new Date();
  private _inicio: any = {
    date: this.dateInicio.getDate(),
    hasEvent: true,
    isSelect: true,
    isThisMonth: true,
    isToday: true,
    month: this.dateInicio.getMonth(),
    year: this.dateInicio.getFullYear()
  }

  constructor(public http: HttpClient, public modalCtrl: ModalController, private almacen: AlmacenamientoProvider) {
    console.log("constructor calendarioprovider");
    this.almacen.recover('listaEventos').then(
      (data) => {
        console.log("depues de recover, " + data);
        if (data != null) {
          this.checkStorageExist = true
        }
        if (this.checkStorageExist) {
          this.rellenarEventos(data);
          this.onDaySelect(this.inicio);
          this.actualizarNotificacionEventos();
        } else {
          //this.cargarEventosPorDefecto();
          this.almacen.storage('listaEventos', this.calendario.eventos);
        };
      });
  }

  mostrarDetalles(evento: Evento) {
    let modalDetalles = this.modalCtrl.create(EventoPage, evento, { enableBackdropDismiss: false })
    modalDetalles.present();

    modalDetalles.onDidDismiss(data => {
      if (data != null) {
        let evento = data;
        this.deleteEvent(evento);
      }
    });
  }

  rellenarEventos(data) {
    let eventosStorage = data;
    this.calendario.eventos = new Array();
    for (let i = 0; i < eventosStorage.length; i++) {
      this.calendario.eventos.push(new Evento(new Date(eventosStorage[i]._date), eventosStorage[i]._tittle, eventosStorage[i]._description))
    }
  }

  onDaySelect($event) {
    if ($event.hasEvent) {
      this.calendario.hayEvento = true;
      this.actualizarEventosToView($event);
    } else {
      this.calendario.hayEvento = false;
    }
    this.event = $event;
  }

  add() {
    this.createNewEvent(this.event);
  }

  onMonthSelect($event) {
    this.calendario.hayEvento = false;
  }

  cargarEventosPorDefecto() {
    this.calendario.eventos = [
      new Evento(new Date(2019, 1, 18, 0, 51, 0, 0), "Huelga", "a la calle"),
      new Evento(new Date(2019, 1, 14, 23, 55, 0, 0), "San Valentin", "vomito arcoiris"),
      new Evento(new Date(2019, 2, 25), "Marzo", "a la calle"),
      new Evento(new Date(2019, 1, 13), "algo", "voiris")
    ];
    this.actualizarNotificacionEventos();
  }


  createNewEvent(event: any) {
    let modalNewEvent = this.modalCtrl.create(NuevoeventoPage, { 'date': event.date, 'month': event.month, 'year': event.year, 'eventos': this.calendario.eventos }, { enableBackdropDismiss: false });
    modalNewEvent.present();

    modalNewEvent.onDidDismiss(data => {
      if (data != null) {
        this.calendario.eventos = data;
        this.actualizarEventosToView(event);
        this.actualizarNotificacionEventos();
      } else {
        console.log("dismiss null");
      }
      this.almacen.storage('listaEventos',this.calendario.eventos);
      this.event = null;
    });
  }

  private actualizarEventosToView(event: any) {
    this.eventosToView = new Array();
    for (let i = 0; i < this.calendario.eventos.length; i++) {
      if (this.calendario.eventos[i].date.getDate() == event.date && this.calendario.eventos[i].date.getMonth() == event.month) {
        this.eventosToView.push(this.calendario.eventos[i]);
      }
    }
  }

  deleteEvent(eventoToDelete: any) {
    var index = this.calendario.eventos.indexOf(eventoToDelete);
    if (index > -1) {
      this.calendario.eventos.splice(index, 1);
    }
    this.eventosToView = new Array();
    for (let i = 0; i < this.calendario.eventos.length; i++) {
      if (this.calendario.eventos[i].date.getDate() == this.event.date && this.calendario.eventos[i].date.getMonth() == this.event.month) {
        this.eventosToView.push(this.calendario.eventos[i]);
      }
    }
    this.actualizarNotificacionEventos();
    this.almacen.storage('listaEventos',this.calendario.eventos);
  }

  actualizarNotificacionEventos() {
    this.currentEvents = new Array();
    for (let i = 0; i < this.calendario.eventos.length; i++) {
      this.currentEvents.push({
        year: this.calendario.eventos[i].date.getFullYear(),
        month: this.calendario.eventos[i].date.getMonth(),
        date: this.calendario.eventos[i].date.getDate()
      });
    }
  }

  public get calendario(): Calendario {
    return this._calendario;
  }

  public set calendario(value: Calendario) {
    this._calendario = value;
  }

  public get eventosToView(): Array<Evento> {
    return this._eventosToView;
  }

  public get currentEvents(): Array<any> {
    return this.calendario.currentEvents;
  }

  public get event(): any {
    return this._event;
  }

  public get dateInicio(): Date {
    return this._dateInicio;
  }

  public get inicio(): any {
    return this._inicio;
  }

  public get checkStorageExist(): boolean {
    return this._checkStorageExist;
  }

  public set eventosToView(value: Array<Evento>) {
    this._eventosToView = value;
  }

  public set currentEvents(value: Array<any>) {
    this.calendario.currentEvents = value;
  }

  public set event(value: any) {
    this._event = value;
  }

  public set dateInicio(value: Date) {
    this._dateInicio = value;
  }

  public set inicio(value: any) {
    this._inicio = value;
  }

  public set checkStorageExist(value: boolean) {
    this._checkStorageExist = value;
  }
  public get asd() {
    return this.calendario.eventos[0];
  }

}
