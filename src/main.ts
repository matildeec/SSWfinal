import 'zone.js/dist/zone';
import 'zone.js/dist/zone';
import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {RootComponent} from "./root/root.component";
import {RouterModule} from "@angular/router";
import { routes } from './root/routes';
//import {routes} from "./app/routes";

bootstrapApplication(RootComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes))]
})
.catch(err => console.error(err));
