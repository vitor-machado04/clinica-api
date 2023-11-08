import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consulta } from './Consulta';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  apiUrl = 'http://localhost:5000/api/Consulta';
  constructor(private http: HttpClient) { }
  listar(): Observable<Consulta[]> {
    const url = `${this.apiUrl}/listar`;
    return this.http.get<Consulta[]>(url);
  }
  buscar(Id: number): Observable<Consulta> {
    const url = `${this.apiUrl}/buscar/${Id}`;
    return this.http.get<Consulta>(url);
  }
  cadastrar(consulta: Consulta): Observable<any> {
    const url = `${this.apiUrl}/cadastrar`;
    return this.http.post<Consulta>(url, consulta, httpOptions);
  }
  atualizar(consulta: Consulta): Observable<any> {
    const url = `${this.apiUrl}/atualizar`;
    return this.http.put<Consulta>(url, consulta, httpOptions);
  }
  excluir(Id: number): Observable<any> {
    const url = `${this.apiUrl}/buscar/${Id}`;
    return this.http.delete<number>(url, httpOptions);
  }

}
