export class LogicaVisualizzazione {
  clean: boolean = true;
  selected: boolean = false;

  attiva(value: string){
    if(value==='inserimento'){
      this.clean = false;
      this.selected = true;
    }
  }
}