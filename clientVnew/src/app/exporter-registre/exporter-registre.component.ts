import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EleveService } from '../service/eleve/eleve.service';
import { ExportExcelService } from '../excel/export-excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
export class Trimestre{
  trimestre:number;
}
@Component({
  selector: 'app-exporter-registre',
  templateUrl: './exporter-registre.component.html',
  styleUrls: ['./exporter-registre.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ExporterRegistreComponent implements OnInit {
  trimestre = "1";
  constructor(private serviceEleve: EleveService,
    private exportExcelService:ExportExcelService,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
  }
  exporter(){
    this.spinner.show(undefined, { fullScreen: true });
    let trimestre = new Trimestre();
    trimestre.trimestre = Number(this.trimestre);
    this.serviceEleve.obtenirElevesParTrimestre(trimestre)
    .subscribe(res => {
      if(res){
        const titre = Number(this.trimestre) === 1?"registre_inscription_"+new Date().getFullYear()+"_"+this.trimestre+"er":
        "registre_inscription_"+new Date().getFullYear()+"_"+this.trimestre+"eme";
        const json = res.length > 0 ? res : null;
        this.exportExcelService.exportAsExcelFile(json,titre);
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }
}