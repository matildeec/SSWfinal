import { Routes } from "@angular/router";
import { InserimentoComponent } from "./inserimento/inserimento.component";
import { RootComponent } from "./root.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'root' },
  { path: 'root', component: RootComponent },
  //{ path: 'ricerca', component: RicercaComponent },
  { path: 'inserimento', component: InserimentoComponent }
]