import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicosComponent } from './components/medicos/medicos.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { ExamesComponent } from './components/exames/exames.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // Use o MainLayoutComponent como o layout da página principal
    children: [
      { path: '', component: HomeComponent },
      { path: 'medicos', component: MedicosComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'exames', component: ExamesComponent},
      { path: 'navbar', component: NavbarComponent},
      { path: 'footer', component: FooterComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
