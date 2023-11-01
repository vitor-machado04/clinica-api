import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import{ HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal'

import { MedicosService } from './medicos.service'; 
import { MedicosComponent } from './components/medicos/medicos.component';

import { PacientesService } from './pacientes.service';
import { PacientesComponent } from './components/pacientes/pacientes.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    PacientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [HttpClientModule, MedicosService, PacientesService],
  bootstrap: [AppComponent]
})
export class AppModule { }