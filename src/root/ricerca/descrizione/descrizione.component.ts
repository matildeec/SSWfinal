import { Component, Input, OnInit } from '@angular/core';
import { ArchivioService } from '../../archivio.service';

@Component({
  selector: 'descrizione',
  standalone: true,
  templateUrl: './descrizione.component.html',
  styleUrls: ['./descrizione.component.css'],
})
export class DescrizioneComponent implements OnInit {
  @Input() autore: string = '';
  @Input() titolo: string = '';
  constructor(private archivio: ArchivioService) { }

  ngOnInit() {
  }

  Remove(){
    this.archivio.rimuoviLibro(this.autore, this.titolo);
    console.log(this.autore, this.titolo);
  }

}