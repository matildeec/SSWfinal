import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'descrizione',
  standalone: true,
  templateUrl: './descrizione.component.html',
  styleUrls: ['./descrizione.component.css']
})
export class DescrizioneComponent implements OnInit {
  @Input() autore: string = '';
  @Input() titolo: string = '';
  constructor() { }

  ngOnInit() {
  }

}