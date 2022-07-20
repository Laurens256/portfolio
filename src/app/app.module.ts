import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpReqService } from './services/http-req.service';
import { ProjectPopupComponent } from './project-popup/project-popup.component';



@NgModule({
  declarations: [
    // alle components
    routingComponents,
    AppComponent,
    ProjectPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpReqService],
  bootstrap: [AppComponent]
})
export class AppModule { }
