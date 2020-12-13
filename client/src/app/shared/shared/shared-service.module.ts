import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RowGridComponent } from 'src/app/examen/row-grid/row-grid.component';
import { LastRowGridComponent } from 'src/app/examen/last-row-grid/last-row-grid.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ RowGridComponent,
    LastRowGridComponent,],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  exports:[
    RowGridComponent,
    LastRowGridComponent,
  ],
  providers:[
    CookieService,
  ]
})
export class SharedServiceModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,getBaseUrl()+"assets/i18n/", ".json");
}


export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}