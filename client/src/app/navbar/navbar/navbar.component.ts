import { Component, OnInit, Inject } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  baseUrl:any;
  constructor(private translate:TranslateService,
    @Inject('BASE_URL') baseUrl: string) { 
    this.translate.setDefaultLang('fr');
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    console.log(this.baseUrl);
  }

}
