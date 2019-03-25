import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoeventoPage } from './nuevoevento';

@NgModule({
  declarations: [
    NuevoeventoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoeventoPage),
  ],
})
export class NuevoeventoPageModule {}
