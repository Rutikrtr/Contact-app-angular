// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ContactService } from './contact.service';

@NgModule({
  declarations: [AppComponent, ContactComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [ContactService],
  bootstrap: [AppComponent],
})
export class AppModule {}
