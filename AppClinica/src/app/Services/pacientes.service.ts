import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../Classes/Paciente';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  apiUrl = 'http://localhost:5000/api/Paciente';
  constructor(private http: HttpClient) { }
  listar(): Observable<Paciente[]> {
    const url = `${this.apiUrl}/listar`;
    return this.http.get<Paciente[]>(url);
  }
  buscar(Id: number): Observable<Paciente> {
    const url = `${this.apiUrl}/buscar/${Id}`;
    return this.http.get<Paciente>(url);
  }
  cadastrar(paciente: Paciente): Observable<any> {
    const url = `${this.apiUrl}/cadastrar`;
    return this.http.post<Paciente>(url, paciente, httpOptions);
  }
  atualizar(paciente: Paciente): Observable<any> {
    const url = `${this.apiUrl}/atualizar`;
    return this.http.put<Paciente>(url, paciente, httpOptions);
  }
  excluir(Id: number): Observable<any> {
    const url = `${this.apiUrl}/excluir/${Id}`;
    return this.http.delete<number>(url, httpOptions);
  }
}
