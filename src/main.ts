import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { PlaylistsComponent } from './app/playlists/playlists.component';
import { NovaPlaylistComponent } from './app/nova-playlist/nova-playlist.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: 'playlist', pathMatch: 'full' }, 
  { path: 'playlist', component: PlaylistsComponent },
  { path: 'nova-playlist', component: NovaPlaylistComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule)]
});
