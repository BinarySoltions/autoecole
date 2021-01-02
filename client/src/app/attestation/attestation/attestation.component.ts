import { Component, OnInit, Inject, AfterViewInit, Input, OnDestroy } from '@angular/core';
import jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import * as $ from 'jquery';
import JsBarcode from 'jsbarcode';
import { Eleve } from 'src/app/entite/eleve.entity';
import { Ecole } from 'src/app/entite/ecole.entity';
import { PersonneResponsable } from 'src/app/entite/personne-responsable.entity';
import {_} from 'underscore';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { EcoleService } from 'src/app/service/ecole/ecole.service';
import { PersonneResponsableService } from 'src/app/service/personne/responsable/personne-responsable.service';
import { phaseDetailModel } from 'src/app/eleve/detail/detail.component';
import { Adresse, AdresseEcole } from 'src/app/entite/adresse.entity';
import { Coordonnee } from 'src/app/entite/coordonnee.entity';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AttestationService } from 'src/app/service/attestation/attestation.service';
import { Attestation } from 'src/app/entite/attestation.entity';
import { NgxSpinnerService } from 'ngx-spinner';

const observableGenerer = new Observable(subscriber => {
  subscriber.next();
  setTimeout(() => {
    subscriber.complete();
  }, 1000);
});
export class AttestationModel extends Attestation{
  eleve_id:number;
  ecole_id:number;
  personne_responsable_id:number;
  personne_responsable2_id :number;
  resultat_phase_une:number;
  signature_eleve_phase_une:Date;
  signature_ecole_phase_une:Date;
  resultat_final:number;
  phase_une:boolean;
}
@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.scss'],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})
export class AttestationComponent implements OnInit,AfterViewInit,OnDestroy {
 
  numeroPermis:string = "";
  typeDeCopies:string[] = ["","COPIE DU DÉLÉGATAIRE","COPIE DE L'ÉCOLE","COPIE DE L'ÉLÈVE"];
  typeCopie:string = "";

  resultat_phaseUne = [false,false,false];
  resultat_final = [false,false,false];

  estCopieDelegataire:boolean = false;
  estPhaseUne : boolean = true;
  phaseUne:phaseDetailModel;
  phaseDeux:phaseDetailModel;
  phaseTrois:phaseDetailModel;
  phaseQuatre:phaseDetailModel;
  personnePhase1:PersonneResponsable = new PersonneResponsable();
  personneAutre:PersonneResponsable = new PersonneResponsable();

  @Input() idEleve:number;
  numeroAttestation : string="00000000";
  private eventsSubscription: any

  @Input() events: Observable<string>;
  @Input() attestation:AttestationModel;

  personnes : PersonneResponsable[]=[];
  eleve:Eleve = new Eleve;
  ecole:Ecole = new Ecole;
  eventClickTelecharger:boolean = false;
  myVar:any;

  constructor(
    @Inject('Window') private window: Window,
    private serviceEleve:EleveService,
    private serviceEcole:EcoleService,
    private servicePersonneResponsable:PersonneResponsableService,
    private translate:TranslateService,
    private router:Router,
    private serviceAttestation:AttestationService,
    private spinner:NgxSpinnerService
    ) { 
      this.translate.setDefaultLang('fr');
    }

  ngOnInit() {
    this.typeCopie = this.typeDeCopies[0];
    this.initialiserPhaseDetailModel();
    this.initialiserEcole();
    this.initialiserEleve();
    this.obtenirEleveById(this.idEleve);
    this.serviceEcole.obtenirEcole().subscribe(e =>{
      this.ecole = e;
      this.attestation.ecole_id = e.id;
    })
    this.servicePersonneResponsable.obtnenirPersonnesResponsables().subscribe(pers=>{
      this.personnes = pers;

      let persPhase1 = this.personnes.find(pers=>pers.id==this.attestation.personne_responsable_id);
      this.personnePhase1 = persPhase1 == null ? new PersonneResponsable:persPhase1;

      let persAutre = this.personnes.find(pers=>pers.id==this.attestation.personne_responsable2_id);
      this.personneAutre = persAutre == null ? new PersonneResponsable:persAutre;

        if(this.attestation.resultat_phase_une)
          this.resultat_phaseUne[this.attestation.resultat_phase_une-1]=true;
        if(this.attestation.resultat_final)
          this.resultat_final[this.attestation.resultat_final-1]=true;
    });
    
    this.eventsSubscription = this.events.subscribe((numAttestation) => {
      this.numeroAttestation = numAttestation;
      this.attestation.numero = numAttestation;
      this.genererBarreCode();
    })
  }
  ngAfterViewInit(): void {
      this.genererBarreCode();
  }
  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }
  obtenirPersonne(value){
    let personne = this.personnes.find(pers=>pers.id==value);
    return personne.nom;
  }
  genererBarreCode(){
    JsBarcode("#barcode", this.numeroAttestation, {
      format: "CODE128C",
      width: 2.5,
      height: 40,
      displayValue: false
    });
  }
  public obtenirEleveById(id:number){
    if(id){
      this.serviceEleve.obtenirEleveById(id).subscribe(eleve=>{
        this.eleve = eleve;
        this.numeroPermis = this.eleve.numero_permis?this.eleve.numero_permis:"";
        this.attestation.eleve_id = eleve.id;
        this.initialiserPhases(eleve);
      });
    }
  }
  initialiserPhases(eleve:any){
    this.phaseUne.modules = _.filter(eleve.modules,function(m){
      return m.phase_id == 1;
    });
    this.phaseUne.nom = _.first(this.phaseUne.modules).phase.nom;

    this.phaseDeux.modules = _.filter(eleve.modules,function(m){
      return m.phase_id == 2;
    });
    this.phaseDeux.nom = _.first(this.phaseDeux.modules).phase.nom;

    this.phaseTrois.modules = _.filter(eleve.modules,function(m){
      return m.phase_id == 3;
    });
    this.phaseTrois.nom = _.first(this.phaseTrois.modules).phase.nom;

    this.phaseQuatre.modules = _.filter(eleve.modules,function(m){
      return m.phase_id == 4;
    });
    this.phaseQuatre.nom = _.first(this.phaseQuatre.modules).phase.nom;
  }
  telecharger() {
    //this.eventClickTelecharger = true
      this.sauvegarderAttestation();
      //this.telechargerParTypeCopies();
    
    }
    sauvegarderAttestation(){
      if(this.estPhaseUne){
        this.attestation.phase_une = true;
        this.attestation.resultat_phase_une = _.indexOf(this.resultat_phaseUne,true)+1;
        this.attestation.personne_responsable_id = this.personnePhase1.id;
      }else{
        this.attestation.resultat_final = _.indexOf(this.resultat_final,true)+1;
        this.attestation.personne_responsable2_id = this.personneAutre.id;
      }
      this.attestation.numero = this.numeroAttestation;
      this.serviceAttestation.AjouterAttestation(this.attestation).subscribe(res=>{
        if(_.has(res,'id')){
          this.imprimer();
        }
      });
    }
    public fermer(){
      this.router.navigate(["/eleves"]);
     }
    public print(quality = 1,filename:string,i) {
      this.eventClickTelecharger = true;
      filename  = this.numeroAttestation +"_"+ filename +"_"+this.eleve.prenom+this.eleve.nom+".pdf";
      const id = `${i}pdf`;
      html2canvas(document.getElementById(id)
               ).then(canvas => {
        let pdf = new jsPDF('p', 'pt', 'letter',1);
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 612, 792,'','FAST');
        setInterval(() => {}, 5000);
        pdf.save(filename);
        this.eventClickTelecharger = false;
        // var uri = pdf.output('dataurlstring');
        // this.openDataUriWindow(uri,"attestation_final.pdf");
      });
    }
    public printAll() {
      var img = [];
      for(let i = 1; i< 4; i++){
        const id = `${i}pdf`;
        html2canvas(document.getElementById(id)
                 ).then(canvas => {
          img.push(canvas.toDataURL('image/png'));
          if(i==3){
            let pdf = new jsPDF('p', 'pt', 'letter',1);
            pdf.addImage(img[0], 'PNG', 0, 0, 612, 792,'','FAST');
            setInterval(() => {}, 2000);
            pdf.addPage();
            pdf.addImage(img[1], 'PNG', 0, 0, 612, 792,'','FAST');
            setInterval(() => {}, 2000);
            pdf.addPage();
            pdf.addImage(img[2], 'PNG', 0, 0, 612, 792,'','FAST');
            setInterval(() => {}, 2000);
            pdf.save(this.numeroAttestation+"_"+"attestation_final_"+this.eleve.prenom+this.eleve.nom+".pdf");
            this.eventClickTelecharger = false;
            // var uri = pdf.output('dataurlstring');
            // this.openDataUriWindow(uri,"attestation_final.pdf");
          }
        });
      }
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
    telechargerParTypeCopies(){
      let q = 1;
      if(this.estPhaseUne){
        this.typeCopie = this.typeDeCopies[0];
        this.print(q,"attestation_phase1",0);
      }
      if(this.estCopieDelegataire){
        this.printAll();
      }
      
    }

    selectionnerComplet(){
      this.estPhaseUne = false;
    }
    initialiserPhaseDetailModel(){
      this.phaseUne = new phaseDetailModel;
      this.phaseUne.nom = "";
      this.phaseUne.modules = [];
  
      this.phaseDeux = new phaseDetailModel;
      this.phaseDeux.nom = "";
      this.phaseDeux.modules = [];
  
      this.phaseTrois = new phaseDetailModel;
      this.phaseTrois.nom = "";
      this.phaseTrois.modules = [];
  
      this.phaseQuatre = new phaseDetailModel;
      this.phaseQuatre.nom = "";
      this.phaseQuatre.modules = [];
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
    obtenirDate(value):any{
      if(!(!value)){
        return value.sans_objet?"S.O":null;
      }
      return null;
    }

    imprimer(){
      //this.print(1,"facture",1);
      this.spinner.show(undefined, { fullScreen: true });
      let req = {id:this.eleve.id}
       this.serviceEleve.genererAttestationPDF(req).subscribe(response=>{
         let a = response.split("\r\n\r\n")
         const byteCharacters = atob(a[1]);
         const byteNumbers = new Array(byteCharacters.length);
         for (let i = 0; i < byteCharacters.length; i++) {
           byteNumbers[i] = byteCharacters.charCodeAt(i);
         }
         const byteArray = new Uint8Array(byteNumbers);
         let file = new Blob([byteArray], { type: 'application/pdf' });   
         var fileURL = URL.createObjectURL(file);
         var tab = window.open(fileURL,'fichier.pdf');
         this.spinner.hide();
       });
     }
}
