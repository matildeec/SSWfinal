import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArchivioService } from '../archivio.service';
import { RootComponent } from '../root.component';

@Component({
  selector: 'ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class RicercaComponent {

  @Input() selezione: boolean = true;
  @Output() selezioneChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private archivio: ArchivioService) { }

  output: any = '0';

  /*searchOnInput(event: any): void{
    let input = (event.target as HTMLInputElement).value;
    let regex = new RegExp(input, "gi");
    const risultatiRicerca = this.Archivio.filter((libro) => ricerca(libro, regex));
    
    function ricerca(libro: Volume, regex: RegExp): boolean {
      const stringaRicerca: string = libro.titolo.concat(" ", libro.autore).toLowerCase();
      return regex.test(stringaRicerca);
    }    

    console.log(risultatiRicerca);
    if (risultatiRicerca.length === 0 || input === '') {
      this.output = "0";
    } else {
      this.output = risultatiRicerca.toString();
    }
  }*/

  clean(){
    this.selezione = false;
    this.selezioneChanged.emit(this.selezione);
  }
}
    