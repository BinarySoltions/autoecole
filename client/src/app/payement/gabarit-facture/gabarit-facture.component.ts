import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Eleve } from 'src/app/entite/eleve.entity';
import { Ecole } from 'src/app/entite/ecole.entity';
import { Payement } from '../payement.model';
import jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import * as $ from 'jquery';
import { Coordonnee } from 'src/app/entite/coordonnee.entity';
import { AdresseEcole, Adresse } from 'src/app/entite/adresse.entity';
import { PayementService } from '../payement.service';

@Component({
  selector: 'app-gabarit-facture',
  templateUrl: './gabarit-facture.component.html',
  styleUrls: ['./gabarit-facture.component.scss']
})
export class GabaritFactureComponent implements OnInit,OnChanges {
  @Input('eleve') eleve = new Eleve();
  @Input('ecole') ecole = new Ecole();
  @Input('payementsPDF') payementsPDF : Payement[];
  @Input('totalPaye') totalPaye:any;
  @Input('eventClickGenerer') eventClickGenerer:any;
  TPS = 5;
  TVQ = 9.975;
  numeroFacture = "";
  dateDuJour = new Date();
  constructor(private servicePayement:PayementService) { }

  ngOnInit() {
    this.initialiserEcole();
    this.initialiserEleve();
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.dateDuJour = new Date();
  }
  obtenirMontantHorsTaxes(value:Payement){
    return value.montant/(1+0.05+0.09975);
  }

  obtenirTotalHorsTaxes(){
    if (this.payementsPDF){
      let montantHorsTaxe = 0;
      this.payementsPDF.forEach(p=>montantHorsTaxe = montantHorsTaxe + Number(p.montant));
      return montantHorsTaxe/(1+0.05+0.09975);
    }
    return 0;
  }
  obtenirTotalAvecTaxes(){
    if (this.payementsPDF){
      let montantHorsTaxe = 0;
      this.payementsPDF.forEach(p=>montantHorsTaxe = montantHorsTaxe + Number(p.montant));
      return montantHorsTaxe;
    }
    return 0;
  }
  obtenirTVQ(){
    return this.obtenirTotalHorsTaxes()*this.TVQ/100;
  }
  obtenirTPS(){
    return this.obtenirTotalHorsTaxes()*this.TPS/100;
  }

  public print(quality = 1,filename:string,i) {
    filename  = filename+'.pdf';
    const id = `${i}pdf`;
    html2canvas(document.getElementById(id)
             ).then(canvas => {
      let pdf = new jsPDF('p', 'pt', 'letter',1);
      pdf.addImage(canvas.toDataURL('image/png',1), 'PNG', 0, 0, 612, 792,'','FAST');
      pdf.save(filename);
      // //pdf.output('dataurlnewwindow',filename);
      // var uri = pdf.output('dataurlstring');
      // this.openDataUriWindow(uri,filename);
    });
  }
  openDataUriWindow(url,filename) {
    var html = '<html><head><title>' +
        filename + '</title>' +
        '<style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style>' +
        '</head><body>' +
        '<iframe src="' + url + '"></iframe>' +
        '</body></html>';
    var a = window.open();
    a.document.write(html);
}
  imprimer(){
   this.print(1,"facture",1);
  }
  printTest(){
    let htmlComplex = document.getElementById("1pdf").outerHTML;
     let res = htmlComplex.replace(/_ngcontent-[a-z]+[-][a-z]+[0-9]+=[?\\]?\"[?\\]?\"/g,"");
     let html = res.replace(/<!--[a-zA-Z"-\]\[}={ \n]+>/g,"");
    this.servicePayement.genererPDF({Html:html}).subscribe((response)=>{

      let file = new Blob([response], { type: 'application/pdf' });            
      //var fileURL = URL.createObjectURL(file);
     })
  }
  public initialiserEleve(){
    this.eleve = new Eleve();
    this.eleve.prenom ="";
    this.eleve.nom = "";
    this.eleve.numero_contrat = "";
    this.eleve.adresse = new Adresse();
    this.eleve.adresse.numero = null;
    this.eleve.adresse.rue = "";
    this.eleve.adresse.appartement = "";
    this.eleve.adresse.municipalite = "";
    this.eleve.adresse.province = "";
    this.eleve.adresse.code_postal = "";
    this.eleve.coordonnee = new Coordonnee();
    this.eleve.coordonnee.telephone = "";
    this.eleve.coordonnee.telephone_autre = "";
  }
  public initialiserEcole(){
    this.ecole = new Ecole();
    this.ecole.raison_social ="";
    this.ecole.nom = "";
    this.ecole.email = "";
    this.ecole.adresse = new AdresseEcole();
    this.ecole.adresse.numero = null;
    this.ecole.adresse.rue = "";
    this.ecole.adresse.appartement = "";
    this.ecole.adresse.municipalite = "";
    this.ecole.adresse.province = "";
    this.ecole.adresse.code_postal = "";
  }
}
