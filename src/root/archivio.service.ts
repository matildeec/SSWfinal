import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ajax, AjaxError, AjaxResponse } from 'rxjs/ajax';
import { Volume } from './volume';

@Injectable({
  providedIn: 'root'
})
export class ArchivioService {
  key: string = '0b6b0802'; 
  base: string = 'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint';
  
  constructor() {}
  
  Inventario: Array<Volume> = [];

  public getData(): Observable<string> {
    return ajax({ //questo è {l'oggetto} richiesto dal metodo ajax()
      method: 'GET',
      url: this.base + '/get?key=' + this.key, 
      crossDomain: true
      }).pipe(
        map((risposta: { response: any; }) => risposta.response) // Trasforma l'oggetto AjaxResponse in una stringa
    );
  }

  public updateInventario(x: string){
    JSON.parse(x).forEach((item: any) => { // parsing per avere l'array
      const libro = new Volume(item.autore, item.titolo);
      this.Inventario.push(libro);
    });
  }

  public sendData(archivio: Array<Volume>) { //invia al database esterno
    const obs = ajax({
      method: 'POST',
      url: this.base + '/set?key=' + this.key,
      crossDomain: true,
      body: JSON.stringify(archivio)
    })
    obs.subscribe({
      next: (res: AjaxResponse<any>) => {},
      error: (err: AjaxError) => console.error(err.response),
      complete: () => {
        console.log(JSON.stringify(archivio));
        console.log('Salvato')
      }
    });
  }

  public aggiungiLibro(autore: string, titolo: string) { //cattura input e aggiunge all'array esistente + richiama setValue()
    let libro: Volume = new Volume(autore, titolo);
    this.Inventario.push(libro);
    this.sendData(this.Inventario);
  }

  public rimuoviLibro(autore: string, titolo: string) {
    this.Inventario = this.Inventario.filter(
      item => !(item.autore === autore && item.titolo === titolo)
      );
    console.log(this.Inventario);
    this.sendData(this.Inventario);
  }
}
