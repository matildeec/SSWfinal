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
      console.log(item)
      const libro = new Volume(item.autore, item.titolo);
      console.log(libro)
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
      next: (res: AjaxResponse<any>) => {
        console.log('Salvato');
      },
      error: (err: AjaxError) => console.error(err.response),
    });
  }

  public aggiungiLibro(autore: string, titolo: string) { //cattura input e aggiunge all'array esistente + richiama setValue()
    let libro: Volume = new Volume(autore, titolo);
    this.Inventario.push(libro);
    console.log(JSON.stringify(this.Inventario))
    this.sendData(this.Inventario);
  }
}
