import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArchivioService } from '../archivio.service';

@Component({
  selector: 'inserimento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css']
})
export class InserimentoComponent {
  @Input() selezione: boolean = true;
  @Output() cambioSelezione: EventEmitter<boolean> = new EventEmitter<boolean>();

  notifica: string = '';

  constructor(private archivio: ArchivioService) { }

  Clean(){
    this.selezione = false;
    this.cambioSelezione.emit(this.selezione);
  }

  Inserisci(autore: string, titolo: string, posizione: string): void {
    if (this.archivio.Inventario.some(item => item.posizione === posizione)) { // Verifica se la posizione è già presente nell'inventario
      this.notifica = 'Posizione già occupata';
      return;
    }
    this.archivio.aggiungiLibro(autore, titolo, posizione, '');
    this.Clean();
  }

}