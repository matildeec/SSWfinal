import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Archivio } from '../archivio';
import { ArchivioService } from '../archivio.service';
import { Volume } from '../volume';
import { DescrizioneComponent } from './descrizione/descrizione.component';

@Component({
  selector: 'ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  standalone: true,
  imports: [CommonModule, DescrizioneComponent]
})
export class RicercaComponent {
  @Input() selezione: boolean = true;
  @Input() clean: boolean = false;
  @Input() archivio: Archivio = new Archivio([]);
  @Output() cambioSelezione: EventEmitter<boolean> = new EventEmitter<boolean>();

  bloccoRicerca: boolean = true;
  output: any = 0;
  indiceVolume: any = null;

  volumeTrovato: Volume = new Volume('', '', '', '');

  constructor(private as: ArchivioService) { }

  SearchOnInput(event: any): void{
    let input = (event.target as HTMLInputElement).value;
    let regex = new RegExp(input, "i");
    const risultatiRicerca = this.archivio.trovaLibri(regex)
    
    if (input === '') {
      this.output = 0;
    } else if (risultatiRicerca.length===1) {
      this.volumeTrovato = risultatiRicerca[0];
      this.indiceVolume = this.archivio.inventario.indexOf(this.volumeTrovato);
      this.bloccoRicerca = false;
    } else {
      console.log(risultatiRicerca)
      this.output = risultatiRicerca.length;
    }
  }

  Clean(): void {
    this.selezione = false;
    this.bloccoRicerca = true;
    this.output = 0;
    this.cambioSelezione.emit(this.selezione);
  }

  HandleCambioSelezione(): void {
    this.clean = true;
    this.Clean();
  }
}
    