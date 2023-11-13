import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receita } from '../Classes/Receita';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {
  apiUrl = 'http://localhost:5000/api/Receita';
  constructor(private http: HttpClient) { }
  listar(): Observable<Receita[]> {
    const url = `${this.apiUrl}/listar`;
    return this.http.get<Receita[]>(url);
  }
  buscar(Id: number): Observable<Receita> {
    const url = `${this.apiUrl}/buscar/${Id}`;
    return this.http.get<Receita>(url);
  }
  cadastrar(receita: Receita): Observable<any> {
    const url = `${this.apiUrl}/cadastrar`;
    return this.http.post<Receita>(url, receita, httpOptions);
  }
  atualizar(receita: Receita): Observable<any> {
    const url = `${this.apiUrl}/atualizar`;
    return this.http.put<Receita>(url, receita, httpOptions);
  }
  excluir(Id: number): Observable<any> {
    const url = `${this.apiUrl}/excluir/${Id}`;
    return this.http.delete<number>(url, httpOptions);
  }
}
