import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WheatherService } from './services/wheather.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [WheatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
