import { Component } from '@angular/core';
import { ListasService, ListaReproducao } from '../playlists/playlist.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nova-playlist',
  templateUrl: './nova-playlist.component.html',
  imports: [FormsModule, CommonModule, RouterModule],
  styleUrls: ['./nova-playlist.component.scss'],
})
export class NovaPlaylistComponent {

  nome: string = '';
descricao: string = '';
tituloMusica: string = '';
artista: string = '';
album: string = '';
ano!: number;
genero: string = '';
musicas: any[] = [];

constructor(private listasService: ListasService, private router: Router) {}

adicionarMusica() {
  if (!this.tituloMusica || !this.artista) return;

  this.musicas.push({
    titulo: this.tituloMusica,
    artista: this.artista,
    album: this.album,
    ano: this.ano,
    genero: this.genero
  });

  // Limpar campos da música
  this.tituloMusica = '';
  this.artista = '';
  this.album = '';
  this.ano = undefined!;
  this.genero = '';
}

removerMusica(musica: any) {
  this.musicas = this.musicas.filter(m => m !== musica);
}

salvarPlaylist() {
  const novaPlaylist = {
    nome: this.nome,
    descricao: this.descricao,
    musicas: this.musicas
  };

   this.listasService.create(novaPlaylist)
      .subscribe({
        next: res => {
          console.log('Playlist salva com sucesso!', res);
          this.router.navigate(['/playlist']);
        },
        error: err => console.error('Erro ao salvar playlist', err)
      });

  console.log('Playlist salva:', novaPlaylist);
}
}