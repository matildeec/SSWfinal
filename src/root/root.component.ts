import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArchivioService } from './archivio.service';
import { InserimentoComponent } from './inserimento/inserimento.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { Volume } from './volume';

@Component({
  selector: 'root',
  standalone: true,
  imports: [CommonModule, InserimentoComponent, RicercaComponent],
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(private archivio: ArchivioService) { }

  Inventary: Array<Volume> = []

  ngOnInit() { 
    this.archivio.getData().subscribe({
      next: (x: string) => this.archivio.updateInventario(x),
      error: (err: string) => console.error('something wrong occurred: ' + err),
      complete: () => {
        console.log('done');
        this.Inventary = this.archivio.Inventario;
      }
    });
   }

  inserimentoSelected: boolean = false;
  ricercaSelected: boolean = false;
  clean: boolean = true;

  attiva(value: string){
    this.clean = false;
    if(value==='inserimento'){
      this.inserimentoSelected = true;
      this.ricercaSelected = false;
    }
    if(value==='ricerca'){
      this.ricercaSelected = true;
      this.inserimentoSelected = false;
    }
  }

  handleSelezioneChanged(newSelezione: boolean): void {
    this.clean = true;
    this.ricercaSelected = false;
    this.inserimentoSelected = false;
  }
}