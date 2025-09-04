import { Component, OnInit } from '@angular/core';
import { ListasService } from './playlist.service';
import { ListaReproducao } from "./playlist.service";
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule, FormsModule, RouterModule],
})
export class PlaylistsComponent implements OnInit {
   listas: ListaReproducao[] = [];
  displayedColumns: string[] = ['nome', 'descricao', 'musicas', 'acoes'];
  filteredListas: any[] = [];
  nomePlaylist: string = '';

  private apiUrl = 'http://localhost:8080/lists'; 
  search: string = '';

  constructor(private http: HttpClient, private listasService: ListasService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.listasService.getAll().subscribe({
      next: data => this.listas = data,
      error: err => console.error('Erro ao carregar listas', err)
    });
  }

  deletePlaylist(listNome: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (confirm(`Tem certeza que quer deletar a playlist "${listNome}"?`)) {
      this.http.delete(`${this.apiUrl}/${listNome}`, { headers }).subscribe({
        next: () => {
          alert(`Playlist "${listNome}" deletada com sucesso!`);
          this.loadPlaylists(); 
        },
        error: (err) => alert('Erro ao deletar playlist: ' + err.message)
      });
    }
  }

  loadPlaylists() {
    this.http.get<any[]>(`${this.apiUrl}`).subscribe({
      next: (data) => this.listas = data,
      error: (err) => console.error('Erro ao carregar playlists', err)
    });
  }

  filterPlaylists() {
    const termo = this.search.toLowerCase();
    this.listas = this.listas.map(p => ({
      ...p,
      musicasFiltradas: p.musicas.filter(m =>
        m.titulo.toLowerCase().includes(termo)
      )
    }));
  }


buscarPlaylist() {
    if (!this.nomePlaylist) return;

    this.http.get<any>(`http://localhost:8080/lists/${this.nomePlaylist}`)
      .subscribe(
        res => {
          this.listas = [res];
        },
        err => {
          this.listas = [];
        }
      );
  }
}