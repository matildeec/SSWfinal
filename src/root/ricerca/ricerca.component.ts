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
  @Output() selezioneChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  defaultSelection: boolean = true;
  output: any = '0';
  autore: string = '';
  titolo: string = '';
  posizione: string = '';
  nominativo: string = '';
  indiceVolume: any = null;

  constructor(private archivio: ArchivioService) { }

  searchOnInput(event: any): void{
    let input = (event.target as HTMLInputElement).value;
    let regex = new RegExp(input, "gi");
    const risultatiRicerca = this.inventario.filter((libro) => ricerca(libro, regex));
    
    function ricerca(libro: Volume, regex: RegExp): boolean {
      const stringaRicerca: string = libro.titolo.concat(" ", libro.autore).toLowerCase();
      return regex.test(stringaRicerca);
    }    
    
    if (input === '') {
      this.output = "0";
    } else if (risultatiRicerca.length===1) {
      const volumeTrovato = risultatiRicerca[0];
      this.indiceVolume = this.inventario.indexOf(volumeTrovato);

      this.defaultSelection = false;
      this.autore = risultatiRicerca[0].autore;
      this.titolo = risultatiRicerca[0].titolo;
      this.posizione = risultatiRicerca[0].posizione;
      this.nominativo = risultatiRicerca[0].nominativo;
    } else {
      this.output = risultatiRicerca.length;
    }
  }

  Clean(){
    this.selezione = false;
    this.defaultSelection = true;
    this.output = '0';
    this.selezioneChanged.emit(this.selezione);
  }

  handleSelezioneChanged(): void {
    this.clean = true;
    this.Clean();
  }
}
    