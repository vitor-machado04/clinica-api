import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import{ HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal'

import { MedicosService } from './Services/medicos.service';
import { MedicosComponent } from './components/medicos/medicos.component';

import { PacientesService } from './Services/pacientes.service';
import { PacientesComponent } from './components/pacientes/pacientes.component';

import { ExamesService } from './Services/exames.service';
import { ExamesComponent } from './components/exames/exames.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { ConsultasService } from './Services/consultas.service';
import { ProntuariosComponent } from './components/prontuarios/prontuarios.component';
import { ReceitasComponent } from './components/receitas/receitas.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    PacientesComponent,
    ExamesComponent,
    ConsultasComponent,
    NavbarComponent,
    FooterComponent,
    MainLayoutComponent,
    HomeComponent,
    ConsultasComponent,
    ProntuariosComponent,
    ReceitasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [HttpClientModule, MedicosService, PacientesService, ExamesService, ConsultasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
