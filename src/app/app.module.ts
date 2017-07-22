import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import {TagSearchService} from "./flickr/service/data.service";
import {TagSearchComponent} from "./flickr/component/search-result/search-result.component";

@NgModule({
  declarations: [
    AppComponent,
    TagSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(rootRouterConfig)
  ],
  providers: [
    TagSearchService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
