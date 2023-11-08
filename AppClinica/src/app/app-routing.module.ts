import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicosComponent } from './components/medicos/medicos.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { ExamesComponent } from './components/exames/exames.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConsultasComponent } from './components/consultas/consultas.component';

const routes: Routes = [
  {
    path: 'medicos',
    component: MedicosComponent
  },
  {
    path: 'pacientes',
    component: PacientesComponent
  },
  {
    path: 'consultas',
    component: ConsultasComponent
  },
  {
    path: 'exames',
    component: ExamesComponent
  },
  {
    path: 'navbar',
    component: NavbarComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
