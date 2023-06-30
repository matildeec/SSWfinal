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
  @Input() view: string = '';
  @Input() archivio: Archivio = new Archivio([]);
  @Output() cambioView: EventEmitter<string> = new EventEmitter<string>();

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
    this.view = 'homepage';
    this.bloccoRicerca = true;
    this.output = 0;
    this.cambioView.emit(this.view);
  }

  HandleCambioView(): void {
    this.Clean();
  }
}
    