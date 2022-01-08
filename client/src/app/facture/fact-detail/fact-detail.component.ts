import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Adresse, AdresseEcole } from 'src/app/entite/adresse.entity';
import { Coordonnee } from 'src/app/entite/coordonnee.entity';
import { Ecole } from 'src/app/entite/ecole.entity';
import { Eleve } from 'src/app/entite/eleve.entity';
import { Payement } from 'src/app/payement/payement.model';
import { PayementService } from 'src/app/payement/payement.service';

@Component({
  selector: 'app-fact-detail',
  templateUrl: './fact-detail.component.html',
  styleUrls: ['./fact-detail.component.scss']
})
export class FactDetailComponent implements OnInit,OnChanges {
  @Input('eleve') eleve = new Eleve();
  @Input('ecole') ecole = new Ecole();
  @Input('payementsPDF') payementsPDF : Payement[];
  @Input('totalPaye') totalPaye:any;
  @Input('eventClickGenerer') eventClickGenerer:any;
  @Input('description') description:any;
  TPS = 5;
  TVQ = 9.975;
  numeroFacture = "";
  dateDuJour = new Date();
  constructor(private servicePayement:PayementService,private spinner:NgxSpinnerService) { }

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
   //this.print(1,"facture",1);
   this.spinner.show(undefined, { fullScreen: true });
   let req = {id:this.eleve.id,payments:this.payementsPDF.map(x=>x.id)}
    this.servicePayement.genererPDF(req).subscribe(response=>{
      let a = response.split("\r\n\r\n")
      const byteCharacters = atob(a[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      let file = new Blob([byteArray], { type: 'application/pdf' });   
      var fileURL = URL.createObjectURL(file);
      var tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = fileURL;
      tempLink.setAttribute('download', "facture_"+this.eleve.prenom+this.eleve.nom+"_"+this.eleve.numero_contrat+'.pdf');
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      //window.URL.revokeObjectURL(fileURL);
      var tab = window.open(fileURL,'fichier.pdf');
      this.spinner.hide();
    });
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

