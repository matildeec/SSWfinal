import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArchivioService } from './archivio.service';
import { InserimentoComponent } from './inserimento/inserimento.component';
import { Volume } from './volume';
import { LogicaVisualizzazione } from './logicaVisualizzazione';

@Component({
  selector: 'root',
  standalone: true,
  imports: [CommonModule, InserimentoComponent, RouterLink],
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(private archivio: ArchivioService) { }

  Archivio: Array<Volume> = []

  ngOnInit() { 
    this.archivio.getData().subscribe({
      next: (x: string) => this.archivio.updateInventario(x),
      error: (err: string) => console.error('something wrong occurred: ' + err),
      complete: () => {
        console.log('done');
        this.Archivio = this.archivio.Inventario;
      }
    });
   }

  inserimentoSelezionato = true
  clean = true;

  attiva(value: string){
    if(value==='inserimento'){
      this.clean = false;
      this.inserimentoSelezionato = true;
    }
  }
}