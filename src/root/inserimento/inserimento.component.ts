import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArchivioService } from '../archivio.service';
import { Archivio } from '../archivio';
import { AjaxError, AjaxResponse } from 'rxjs/ajax';

@Component({
  selector: 'inserimento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css']
})
export class InserimentoComponent {
  @Input() selezione: boolean = true;
  @Input() archivio: Archivio = new Archivio([]);
  @Output() cambioSelezione: EventEmitter<boolean> = new EventEmitter<boolean>();

  notifica: string = '';

  constructor(private as: ArchivioService) { }

  Clean(): void {
    this.notifica = '';
    this.selezione = false;
    this.cambioSelezione.emit(this.selezione);
  }

  Inserisci(autore: string, titolo: string, posizione: string): void {
    if (autore.trim() === '' || titolo.trim() === '' || posizione.trim() === '') {
      this.notifica = 'I campi non possono essere vuoti';
      return;
    }

    if (this.archivio.inventario.some(item => item.posizione === posizione.toUpperCase())) {
      this.notifica = 'Posizione già occupata';
      return;
    }

    this.archivio.aggiungiLibro(autore, titolo, posizione.toUpperCase(), '');
    this.as.sendData(JSON.stringify(this.archivio.inventario)).subscribe({
      next: (res: AjaxResponse<any>) => console.log(res.response),
      error: (err: AjaxError) => console.error(err.response),
      complete: () => {
        console.log('Salvato')
      }
    });
    this.Clean();
  }

}