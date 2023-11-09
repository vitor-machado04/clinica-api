import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from './Medico';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  obterMedicoPorId(idAlteracao: number) {
    throw new Error('Method not implemented.');
  }
  apiUrl = 'http://localhost:5000/api/Medico';
  constructor(private http: HttpClient) { }
  listar(): Observable<Medico[]> {
    const url = `${this.apiUrl}/listar`;
    return this.http.get<Medico[]>(url);
  }
  buscar(Id: number): Observable<Medico> {
    const url = `${this.apiUrl}/buscar/${Id}`;
    return this.http.get<Medico>(url);
  }
  cadastrar(medico: Medico): Observable<any> {
    const url = `${this.apiUrl}/cadastrar`;
    return this.http.post<Medico>(url, medico, httpOptions);
  }
  atualizar(medico: Medico): Observable<any> {
    const url = `${this.apiUrl}/atualizar`;
    return this.http.put<Medico>(url, medico, httpOptions);
  }
  excluir(Id: number): Observable<any> {
    const url = `${this.apiUrl}/excluir/${Id}`;
    return this.http.delete<number>(url, httpOptions);
  }
}
