import { Component, OnInit } from '@angular/core';
import core from 'src/app/core/core.json';
import lien from 'src/app/core/lien.json';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  champ:any=core;
  lien:any=lien;
  constructor() { }

  ngOnInit() {
  }

}
