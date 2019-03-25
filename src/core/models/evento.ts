export class Evento {
	private _date: Date;
	private _tittle: string;
	private _description: string;
	private _notificacion: boolean;

	constructor(_date: Date, _title: string, _description: string) {
		this._date = _date;
		this._tittle = _title;
		this._description = _description;
		this._notificacion = false;
	}

	public get date(): Date {
		return this._date;
	}

	public get tittle(): string {
		return this._tittle;
	}

	public get description(): string {
		return this._description;
	}

	public set date(value: Date) {
		this._date = value;
	}

	public set tittle(value: string) {
		this._tittle = value;
	}

	public set description(value: string) {
		this._description = value;
	}
	public get notificacion(): boolean {
		return this._notificacion;
	}
	public set notificacion(value: boolean) {
		this._notificacion = value;
	}

}