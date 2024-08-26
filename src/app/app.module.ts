import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from './components/rating/rating.component';
import { StreamPipesComponent } from './components/stream-pipes/stream-pipes.component';
import { CombinationPipesComponent } from './components/combination-pipes/combination-pipes.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, RatingComponent, StreamPipesComponent, CombinationPipesComponent, WelcomeComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
