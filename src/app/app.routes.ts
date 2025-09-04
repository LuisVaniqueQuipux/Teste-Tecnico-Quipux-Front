import { Routes } from '@angular/router';
import { PlaylistsComponent } from './playlists/playlists.component';
import { NovaPlaylistComponent } from './nova-playlist/nova-playlist.component';

export const routes: Routes = [
    { path: '', redirectTo: 'playlists', pathMatch: 'full' },
    {path: 'playlists', component: PlaylistsComponent},
    {path: 'nova-playlist', component: NovaPlaylistComponent},
    { path: '**', redirectTo: 'playlist' }
];
