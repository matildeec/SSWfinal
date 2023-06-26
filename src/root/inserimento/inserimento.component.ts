import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArchivioService } from '../archivio.service';

@Component({
  selector: 'inserimento',
  standalone: true,
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css']
})
export class InserimentoComponent /*implements OnInit*/ {

  constructor(private router: Router, private archivio: ArchivioService) { }

  navigaVersoPagina(page: string): void {
    this.router.navigate([page]);
  }

  Insert(autore: string, titolo: string): void {
    //Passa i valori delle var autoreValue, titoloValue, posizioneValue
    this.archivio.aggiungiLibro(autore, titolo);
  }

}