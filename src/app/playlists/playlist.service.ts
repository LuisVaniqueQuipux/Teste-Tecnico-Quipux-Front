import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Musica {
  titulo: string;
  artista: string;
  album: string;
  ano: number;
  genero: string;
}

export interface ListaReproducao {
  nome: string;
  descricao: string;
  musicas: Musica[];
}

@Injectable({ providedIn: 'root' })
export class ListasService {
  private apiUrl = 'http://localhost:8080/lists'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<ListaReproducao[]> {
    return this.http.get<ListaReproducao[]>(this.apiUrl);
  }

  create(lista: ListaReproducao): Observable<ListaReproducao> {
    return this.http.post<ListaReproducao>(this.apiUrl, lista);
  }

  searchPlaylists(nome: string): Observable<ListaReproducao[]> {
    return this.http.get<ListaReproducao[]>(`${this.apiUrl}/` + nome);
  }
}
