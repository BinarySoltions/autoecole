import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import * as $ from 'jquery';
import JsBarcode from 'jsbarcode';
// @Component({
//   selector: 'app-attestation',
//   templateUrl: './attestation.component.html',
//   styleUrls: ['./attestation.component.scss']
// })

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.scss'],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})
export class AttestationComponent implements OnInit,AfterViewInit {
  numeroPermis:string = "M000000000000";
  typeDeCopies:string[] = ["","COPIE DU DÉLÉGATAIRE","COPIE DE L'ÉCOLE","COPIE DE L'ÉLÈVE"];
  typeCopie:string = "";
  nomEcole:string = "Pconduite Inc";
  adresseEcole:string = "6875, avenue victoria";
  municipaliteEcole:string = "Montréal";
  provinceEcole:string = "Québec";
  codePostalEcole:string = "H3W 2T3";
  emailEcole:string = "info@pconduite.com";
  numeroEcole:string = "A132";
  
  nomEleve:string = "Mbodji, Cheikh";
  adresseEleve:string = "210, rue varry";
  municipaliteEleve:string = "Saint Laurent";
  provinceEleve:string = "Québec";
  codePostalEleve:string = "H4N 1A3";
  telephoneEleve:string = "(438) 992-9780";
  numeroContratEleve:string = "000-000";

  numeroAttestation:string = "00597587";

  dateModule:Date = new Date();

  phaseUne : boolean = false;
  complet : boolean = false;

  ngAfterViewInit(): void {
    JsBarcode("#barcode", this.numeroAttestation, {
      format: "CODE128C",
      width: 2.5,
      height: 40,
      displayValue: false
    });
  }

  constructor(
    @Inject('Window') private window: Window,
    ) { 
      
    }

  ngOnInit() {
    this.typeCopie = this.typeDeCopies[0];
  }
  
  download() {
      this.print(2,"attestation_"+this.typeCopie);
      //this.telechargerParTypeCopies();
    }

    public print(quality = 1,filename:string) {
      filename  = filename+'.pdf';
  
      html2canvas(document.querySelector('#pdf'), 
                  {scale: quality}
               ).then(canvas => {
        let pdf = new jsPDF('p', 'pt', 'letter');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 612, 792);
        pdf.save(filename);
      });
    }

    telechargerParTypeCopies(){
      let q = 2;
      if(this.phaseUne){
        this.typeCopie = this.typeDeCopies[0];
        this.print(q,"attestation_phase1_test");
      }
      if(this.complet){
        this.typeDeCopies.forEach(t => {
          if(t != ""){
            this.typeCopie = t;
            this.print(q,"attestation_"+t);
          }
        })
      }
    }
}
