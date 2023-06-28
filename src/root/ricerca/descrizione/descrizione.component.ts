import { Component, Input, OnInit } from '@angular/core';
import { ArchivioService } from '../../archivio.service';

@Component({
  selector: 'descrizione',
  standalone: true,
  templateUrl: './descrizione.component.html',
  styleUrls: ['./descrizione.component.css'],
})
export class DescrizioneComponent implements OnInit {
  @Input() autore: string = '';
  @Input() titolo: string = '';
  @Input() posizione: string = '';
  constructor(private archivio: ArchivioService) { }

  ngOnInit() {
  }

  Remove(){
    this.archivio.rimuoviLibro(this.autore, this.titolo);
  
  }

  Presta(nominativo: string): void {
    //Passa i valori delle var autore, titolo, posizione
    this.archivio.aggiungiLibro(this.autore, this.titolo, this.posizione, nominativo);

  }

}