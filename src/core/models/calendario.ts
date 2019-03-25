import { Evento } from '../../core/models/evento';

export class Calendario {

    private _hayEvento: boolean;
    private _eventos: Array<Evento> = [];
    private _currentEvents = [];

    constructor() {

    }

    public get hayEvento(): boolean {
        return this._hayEvento;
    }

    public get eventos(): Array<Evento> {
        return this._eventos;
    }

    public get currentEvents(): any {
        return this._currentEvents;
    }

    public set currentEvents(value: any) {
        this._currentEvents = value;
    }

    public set hayEvento(value: boolean) {
        this._hayEvento = value;
    }

    public set eventos(value: Array<Evento>) {
        this._eventos = value;
    }

}