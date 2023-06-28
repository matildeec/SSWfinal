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

  constructor(private router: Router, private archivio: ArchivioService) { }

  clean(){
    this.selezione = false;
    this.selezioneChanged.emit(this.selezione);
  }

  Insert(autore: string, titolo: string): void {
    //Passa i valori delle var autore, titolo, posizione
    this.archivio.aggiungiLibro(autore, titolo);
    this.clean();
  }

}