import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() inventario: Array<Volume> = [];
  @Output() cambioSelezione: EventEmitter<boolean> = new EventEmitter<boolean>();

  bloccoRicerca: boolean = true;
  output: any = 0;
  indiceVolume: any = null;

  volumeTrovato: Volume = new Volume('', '', '', '');

  constructor(private archivio: ArchivioService) { }

  SearchOnInput(event: any): void{
    let input = (event.target as HTMLInputElement).value;
    let regex = new RegExp(input, "gi");
    const risultatiRicerca = this.inventario.filter((libro) => ricerca(libro, regex));
    
    function ricerca(libro: Volume, regex: RegExp): boolean {
      const stringaRicerca: string = libro.titolo.concat(" ", libro.autore, " ", libro.posizione).toLowerCase();
      return regex.test(stringaRicerca);
    }
    
    if (input === '') {
      this.output = 0;
    } else if (risultatiRicerca.length===1) {
      this.volumeTrovato = risultatiRicerca[0];
      this.indiceVolume = this.inventario.indexOf(this.volumeTrovato);
      this.bloccoRicerca = false;
    } else {
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
    