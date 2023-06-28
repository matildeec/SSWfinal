import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  @Output() selezioneChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  notifica: string = '';

  constructor(private router: Router, private archivio: ArchivioService) { }

  clean(){
    this.selezione = false;
    this.selezioneChanged.emit(this.selezione);
  }

  Insert(autore: string, titolo: string, posizione: string): void {
    //Passa i valori delle var autore, titolo, posizione

    if (this.archivio.Inventario.some(item => item.posizione === posizione)) { // Verifica se la posizione è già presente nell'inventario
      this.notifica = 'Posizione già occupata';
      return;
    }
    this.archivio.aggiungiLibro(autore, titolo, posizione, '');
    this.clean();
  }

}