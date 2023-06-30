import { Volume } from "./volume";

export class Archivio {

  constructor(public inventario: Array<Volume>) {}
  
  aggiornaInventario(json: string): void { //costruisce l'array dalla stringa JSON
    JSON.parse(json).forEach((item: any) => { //parsing per avere l'array
      const libro = new Volume(item.autore, item.titolo, item.posizione, item.nominativo);
      this.inventario.push(libro);
    });
  }

  aggiungiLibro(autore: string, titolo: string, posizione: string, nominativo: string): void {
    let libro: Volume = new Volume(autore, titolo, posizione, nominativo);
    this.inventario.push(libro);
  }
  
  trovaLibri(regex: RegExp): any {
    const risultatiRicerca = this.inventario.filter((libro) => ricerca(libro, regex));

    function ricerca(libro: Volume, regex: RegExp): boolean {
      let stringaRicerca: string = libro.titolo.concat(" ", libro.autore, " ", libro.posizione).toLowerCase();
      return regex.test(stringaRicerca);
    }
    return risultatiRicerca;
  }

  rimuoviLibro(autore: string, titolo: string, posizione: string) {
    const index = this.inventario.findIndex(item => item.autore === autore && item.titolo === titolo && item.posizione === posizione);
    if (index !== -1) {
      this.inventario.splice(index, 1);
    }
  }
}
