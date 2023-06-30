import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ajax, AjaxError, AjaxResponse } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class ArchivioService {
  key: string = '0b6b0802'; 
  base: string = 'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint';
  
  constructor() {}
  
  public getData(): Observable<string> {
    return ajax({
      method: 'GET',
      url: this.base + '/get?key=' + this.key, 
      crossDomain: true
      }).pipe(
        map((risposta: { response: any; }) => risposta.response) //trasforma l'oggetto AjaxResponse in una stringa
    );
  }

  public sendData(json: string): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'POST',
      url: this.base + '/set?key=' + this.key,
      crossDomain: true,
      body: json
    })
  }
}