import { Component, OnInit } from '@angular/core';
import { ParametresContrat } from '../parametres-contrat/parametres-contrat.component';
import { ContratService } from '../service/contrat/contrat.service';
import { Eleve } from '../entite/eleve.entity';
import { Ecole } from '../entite/ecole.entity';
import { AdresseEcole, Adresse } from '../entite/adresse.entity';
import { Coordonnee } from '../entite/coordonnee.entity';
import jsPDF from 'jspdf';
import * as  html2canvas from "html2canvas";
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { EcoleService } from '../service/ecole/ecole.service';
import { EleveService } from '../service/eleve/eleve.service';
import { NgxSpinnerService } from 'ngx-spinner';
import moment from 'moment';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {
  parametres = new ParametresContrat();
  eleve:Eleve = new Eleve();
  idEleve: number;
  TPS = 9.975;
  TVQ = 5;
  ecole = new Ecole();
  actionGenerer: boolean;
  totalPaye = 0;
  versement = 0;
  dateVersion: any;
  heurePratique: any;
  heureTheorique: any;

  constructor(private serviceContrat:ContratService, private activatedRoute:ActivatedRoute,
    private router:Router, 
    private toastr: ToastrService,
    private translate:TranslateService,
    private serviceEcole:EcoleService,
    private serviceEleve:EleveService,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.dateVersion = moment("2019-01-01").format("YYYY-MM-DD");
    //this.dateVersion.setMonth(0);
    this.idEleve = +this.activatedRoute.snapshot.paramMap.get('id');
    this.obtenirParametresContrat();
    this.initialiserEcole();
    this.initialiserEleve();
    this.serviceEleve.obtenirEleveById(this.idEleve).subscribe(res=>{
      if(res){
        this.eleve = res;
        const v = this.eleve.frais_inscription/6;
        this.versement = Number(v.toFixed(2));
      }
    });
    this.serviceEcole.obtenirEcole().subscribe(res=>{
      if(res){
        this.ecole = res;
      }
    })
  }
  obtenirParametresContrat(){
    this.serviceContrat.obtenirParametresContrat().subscribe(res=>{
      if(res) {
        this.parametres = res;
      }
    });
  }
  obtenirTotalHorsTaxes(){
    if (this.eleve){
      let montantHorsTaxe = Number(this.eleve.frais_inscription);
      return montantHorsTaxe/(1+0.05+0.09975);
    }
    return 0;
  }
  obtenirTotalAvecTaxes(){
    if (this.eleve){
      return Number(this.eleve.frais_inscription);
    }
    return 0;
  }
  obtenirTVQ(){
    return this.obtenirTotalHorsTaxes()*this.TVQ/100;
  }
  obtenirTPS(){
    return this.obtenirTotalHorsTaxes()*this.TPS/100;
  }
  

  heuresEvent(event){
    this.heurePratique = event.heurePratique;
    this.heureTheorique = event.heureTheorique;
  }

  imprimer(){
    this.spinner.show(undefined, { fullScreen: true });
    let req = {id:this.eleve.id,heurePratique:this.heurePratique,heureTheorique:this.heureTheorique};
    this.serviceEleve.genererContratPDF(req).subscribe(response=>{
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
      tempLink.setAttribute('download', "contrat-"+this.eleve.numero_contrat+"_"+this.eleve.prenom+"_"+this.eleve.nom+".pdf");
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(fileURL);
      //var tab = window.open(fileURL,'_blank');
      this.spinner.hide();
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
  fermer(){
    this.router.navigate(['/eleves']);
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
