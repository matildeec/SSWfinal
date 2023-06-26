import 'zone.js/dist/zone';
import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {RootComponent} from "./root/root.component";
import {RouterModule} from "@angular/router";
//import {routes} from "./app/routes";

bootstrapApplication(RootComponent)
.catch(err => console.error(err));
