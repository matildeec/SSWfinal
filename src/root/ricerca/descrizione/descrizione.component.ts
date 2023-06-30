import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Volume } from '../../volume';
import { ArchivioService } from '../../archivio.service';
import { Archivio } from '../../archivio';
import { AjaxError, AjaxResponse } from 'rxjs/ajax';

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
  @Input() archivio: Archivio = new Archivio([]);
  @Input() selezione: boolean = true;
  @Input() defaultSelection: boolean = true;
  @Output() cambioSelezione: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private as: ArchivioService) { }

  Clean(): void {
    this.selezione = false;
    this.defaultSelection = true;
    this.cambioSelezione.emit(this.selezione);
  }

  InviaDati(): void {
    this.as.sendData(JSON.stringify(this.archivio.inventario)).subscribe({
      next: (res: AjaxResponse<any>) => console.log(res.response),
      error: (err: AjaxError) => console.error(err.response),
      complete: () => {
        console.log('Salvato')
      }
    });
    this.Clean();
  }

  Rimuovi(): void {
    this.archivio.rimuoviLibro(this.volumeTrovato.autore, this.volumeTrovato.titolo, this.volumeTrovato.posizione);
    this.InviaDati();
  }

  Presta(nome: string): void {
    this.archivio.inventario[this.indiceVolume].nominativo = nome;
    this.InviaDati();
  }

  Restituisci(): void {
    this.archivio.inventario[this.indiceVolume].nominativo = '';
    this.InviaDati();
  }
}