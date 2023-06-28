import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArchivioService } from '../archivio.service';
import { RootComponent } from '../root.component';
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
  @Input() inventario: Array<Volume> = [];
  @Output() selezioneChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  defaultSelection: boolean = true;
  output: any = '0';
  autore: string = '';
  titolo: string = '';
  posizione: string = '';
  indiceVolume: any = null;

  constructor(private router: Router, private archivio: ArchivioService) { }

  searchOnInput(event: any): void{
    let input = (event.target as HTMLInputElement).value;
    let regex = new RegExp(input, "gi");
    const risultatiRicerca = this.inventario.filter((libro) => ricerca(libro, regex));
    
    function ricerca(libro: Volume, regex: RegExp): boolean {
      const stringaRicerca: string = libro.titolo.concat(" ", libro.autore).toLowerCase();
      return regex.test(stringaRicerca);
    }    

    console.log(risultatiRicerca);
    
    if (input === '') {
      this.output = "0";
    } else if (risultatiRicerca.length===1) {
      const volumeTrovato = risultatiRicerca[0];
      this.indiceVolume = this.inventario.indexOf(volumeTrovato);

      this.defaultSelection = false;
      this.autore = risultatiRicerca[0].autore;
      this.titolo = risultatiRicerca[0].titolo;
      this.posizione = risultatiRicerca[0].posizione;
    } else {
      this.output = risultatiRicerca.length;
    }
  }

  clean(){
    this.selezione = false;
    this.defaultSelection = true;
    this.output = '0';
    this.selezioneChanged.emit(this.selezione);
  }
}
    