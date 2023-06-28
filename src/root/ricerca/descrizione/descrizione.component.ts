import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Volume } from '../../volume';
import { ArchivioService } from '../../archivio.service';

@Component({
  selector: 'descrizione',
  standalone: true,
  templateUrl: './descrizione.component.html',
  styleUrls: ['./descrizione.component.css'],
  imports: [CommonModule]
})
export class DescrizioneComponent {
  @Input() indiceVolume: any = null;
  @Input() volumeTrovato: Volume = new Volume('', '', '', '');

  @Input() selezione: boolean = true;
  @Input() defaultSelection: boolean = true;
  @Output() selezioneChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private archivio: ArchivioService) { }

  Clean(){
    this.selezione = false;
    this.defaultSelection = true;
    this.selezioneChanged.emit(this.selezione);
  }

  Rimuovi(){
    this.archivio.rimuoviLibro(this.volumeTrovato.autore, this.volumeTrovato.titolo);
  
  }

  Presta(nome: string): void {
    this.archivio.Inventario[this.indiceVolume].nominativo = nome;
    this.archivio.sendData(this.archivio.Inventario);
    this.Clean();
  }

  Restituisci(){
    this.archivio.Inventario[this.indiceVolume].nominativo = '';
    this.archivio.sendData(this.archivio.Inventario);
    this.Clean();
  }

}