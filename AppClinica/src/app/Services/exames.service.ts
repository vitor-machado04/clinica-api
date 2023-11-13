import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exame } from '../Classes/Exame';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ExamesService {
  apiUrl = 'http://localhost:5000/api/Exame';
  constructor(private http: HttpClient) { }
  listar(): Observable<Exame[]> {
    const url = `${this.apiUrl}/listar`;
    return this.http.get<Exame[]>(url);
  }
  buscar(Id: number): Observable<Exame> {
    const url = `${this.apiUrl}/buscar/${Id}`;
    return this.http.get<Exame>(url);
  }
  cadastrar(exame: Exame): Observable<any> {
    const url = `${this.apiUrl}/cadastrar`;
    return this.http.post<Exame>(url, exame, httpOptions);
  }
  atualizar(exame: Exame): Observable<any> {
    const url = `${this.apiUrl}/atualizar`;
    return this.http.put<Exame>(url, exame, httpOptions);
  }
  excluir(Id: number): Observable<any> {
    const url = `${this.apiUrl}/buscar/${Id}`;
    return this.http.delete<number>(url, httpOptions);
  }
}
