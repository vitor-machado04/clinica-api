import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prontuario } from './Prontuario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProntuariosService {
  apiUrl = 'http://localhost:5000/api/Prontuario';
  constructor(private http: HttpClient) { }
  listar(): Observable<Prontuario[]> {
    const url = `${this.apiUrl}/listar`;
    return this.http.get<Prontuario[]>(url);
  }
  buscar(Id: number): Observable<Prontuario> {
    const url = `${this.apiUrl}/buscar/${Id}`;
    return this.http.get<Prontuario>(url);
  }
  cadastrar(prontuario: Prontuario): Observable<any> {
    const url = `${this.apiUrl}/cadastrar`;
    return this.http.post<Prontuario>(url, prontuario, httpOptions);
  }
  atualizar(prontuario: Prontuario): Observable<any> {
    const url = `${this.apiUrl}/atualizar`;
    return this.http.put<Prontuario>(url, prontuario, httpOptions);
  }
  excluir(Id: number): Observable<any> {
    const url = `${this.apiUrl}/excluir/${Id}`;
    return this.http.delete<number>(url, httpOptions);
  }

}
