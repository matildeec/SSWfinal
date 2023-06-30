import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArchivioService } from './archivio.service';
import { InserimentoComponent } from './inserimento/inserimento.component';
import { Archivio } from './archivio';
import { RicercaComponent } from './ricerca/ricerca.component';

@Component({
  selector: 'root',
  standalone: true,
  imports: [CommonModule, InserimentoComponent, RicercaComponent],
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  inserimentoSelected: boolean = false;
  ricercaSelected: boolean = false;
  clean: boolean = true;

  archivio: Archivio = new Archivio([])

  constructor(private as: ArchivioService) { }

  ngOnInit() { 
    this.as.getData().subscribe({
      next: (x: string) => this.archivio.aggiornaInventario(x),
      error: (err: string) => console.error('something wrong occurred: ' + err),
      complete: () => {
        console.log('done');
        console.log(this.archivio);
      }
    });
   }

  Attiva(value: string): void {
    this.clean = false;
    this.inserimentoSelected = value === 'inserimento';
    this.ricercaSelected = value === 'ricerca';
  }

  HandleCambioSelezione(): void {
    this.clean = true;
    this.ricercaSelected = false;
    this.inserimentoSelected = false;
  }
}