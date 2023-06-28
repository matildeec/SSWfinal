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
  @Input() indiceVolume: any = null;
  constructor(private archivio: ArchivioService) { }

  ngOnInit() {
  }

  Remove(){
    this.archivio.rimuoviLibro(this.autore, this.titolo);
  
  }

  Presta(nominativo: string): void {
    this.archivio.Inventario[this.indiceVolume].nominativo = nominativo;
    this.archivio.sendData(this.archivio.Inventario);
  }

}