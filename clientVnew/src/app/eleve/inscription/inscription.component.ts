import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Eleve } from 'src/app/entite/eleve.entity';
import { Adresse } from 'src/app/entite/adresse.entity';
import { Coordonnee } from 'src/app/entite/coordonnee.entity';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})

export class InscriptionComponent implements OnInit {

  listeProvinces : any;
  eleveModele:Eleve;
  idEleve:number;
  action:string;
  model:any;

  @ViewChild('formulaire') formulaire:NgForm;
  cookiePremiereInscription:any;
  languages: { value: string; label: string; }[];
  lang = 'fr';
  condition :boolean;
  pdfUrlFr!: SafeResourceUrl;
  pdfUrlEn!: SafeResourceUrl;

  constructor(private router:Router,
        private serviceEleve:EleveService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private translate:TranslateService,
        private cookieService:CookieService,
        private sanitizer: DomSanitizer) {
         this.translate.setDefaultLang('fr');
          this.cookiePremiereInscription = this.cookieService.get('subscribe-student');
         }

  ngOnInit() {
    this.initialiserEleveModele();
    this.idEleve = +this.activatedRoute.snapshot.paramMap.get('id');
    this.obtenirEleveById(this.idEleve);
    this.listeProvinces = [
      { value: 'Québec', label: 'Québec' },
      { value: 'Ontario', label: 'Ontario' }
      ];
      this.languages = [
        { value: 'fr', label: 'FR' },
        { value: 'eng', label: 'ENG' }
        ];

        this.pdfUrlFr = this.sanitizer.bypassSecurityTrustResourceUrl('assets/feuillet-medical-liste-maladie-deficits-fonctionnels2024.pdf');
        this.pdfUrlEn = this.sanitizer.bypassSecurityTrustResourceUrl('assets/illness-functional-impairment-checklist2024.pdf');

        (window as any).openPolicy = (lang: string) => this.openPolicy(lang);

        this.openPolicy();
    }

    openPolicy(lang: string = 'fr') {
    const pdfUrl =
      lang === 'fr'
        ? 'assets/feuillet-medical-liste-maladie-deficits-fonctionnels2024.pdf'
        : 'assets/illness-functional-impairment-checklist2024.pdf';

    Swal.fire({
      title: 'Veuillez lire la politique',
      width: '900px',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
      confirmButtonText: 'J’accepte',
      didOpen: () => {
        const confirmBtn = Swal.getConfirmButton();
        confirmBtn.disabled = false; // 🔒 Désactivate au début

        const policyBox = document.getElementById('pdf-container');
        if (policyBox) {
          policyBox.addEventListener('scroll', () => {
            if (policyBox.scrollTop + policyBox.clientHeight >= policyBox.scrollHeight - 2) {
              confirmBtn.disabled = false; // 🔓 Activer lorsque scrolled tout en bas
            }
          });
        }
      },
      html: `
        <div style="margin-bottom:10px;">
          <button onclick="window.openPolicy('fr')" style="margin-right:5px;">
            Français
          </button>
          <button onclick="window.openPolicy('eng')">
            English
          </button>
        </div>

        <div id="pdf-container"
             style="
               max-height:65vh;
               overflow-y:auto;
               padding:5px;
               border:1px solid #ccc;
               border-radius:6px;
             ">
          <iframe src="assets/pdfjs/web/viewer.html?file=../../../${pdfUrl}"
                  width="100%" height="600px"
                  style="border:none;">
          </iframe>
        </div>
      `,
    }).then(result => {
      if (result.isConfirmed) {
       //localStorage.setItem("policyIsOk","true")
      }
    });
    }
  public obtenirEleveById(id:number){
    if(id){
      this.action = "Modifier";
      this.serviceEleve.obtenirEleveById(id).subscribe(eleve=>{
        this.eleveModele = eleve;
        this.initialiserDate();
      });
    }else{
      this.action = "Ajouter";
    }
  }
  initialiserDate(){
    this.eleveModele.date_naissance = !this.eleveModele.date_naissance?null:this.obtenirDate(this.eleveModele.date_naissance);
    this.eleveModele.date_inscription = !this.eleveModele.date_inscription?null:this.obtenirDate(this.eleveModele.date_inscription);
    this.eleveModele.date_contrat = !this.eleveModele.date_contrat?null:this.obtenirDate(this.eleveModele.date_contrat);
    this.eleveModele.date_fin_permis = !this.eleveModele.date_fin_permis?null:this.obtenirDate(this.eleveModele.date_fin_permis);
    this.eleveModele.date_fin_contrat = !this.eleveModele.date_fin_contrat?null:this.obtenirDate(this.eleveModele.date_fin_contrat);
  }
  obtenirDate(value:any):any{
    return moment(value).format();
  }
  public enregistrer(){
    if(!this.cookiePremiereInscription){
    this.formaterDate();
    this.serviceEleve.inscrireEleve(this.eleveModele).subscribe((eleve)=>{
      this.eleveModele.id = eleve.id;
      this.toastr.success("Merci / Thank's!", "Succes / Success", {timeOut: 5000});
      this.cookiePremiereInscription = 'uurureurueureuredj';
      this.cookieService.set('subscribe-student', this.cookiePremiereInscription);
    });
  } else {
    this.toastr.error("Erreur / Error !", "Erreur / Error !", {timeOut: 5000});
  }
  }
  formaterDate(){
    this.eleveModele.date_inscription = !this.eleveModele.date_inscription?null:moment(this.eleveModele.date_inscription).format('YYYY-MM-DD');
    this.eleveModele.date_naissance = !this.eleveModele.date_naissance?null:moment(this.eleveModele.date_naissance).format('YYYY-MM-DD');
    this.eleveModele.date_contrat = !this.eleveModele.date_contrat?null:moment(this.eleveModele.date_contrat).format('YYYY-MM-DD');
    this.eleveModele.date_fin_permis = !this.eleveModele.date_fin_permis?null:moment(this.eleveModele.date_fin_permis).format('YYYY-MM-DD');
  }
  public fermer(){
    this.router.navigate(['/']);
  }
  obtenirFinContrat(valeur){
    if(valeur) {
      this.eleveModele.date_fin_contrat = moment(valeur.value.format('YYYY-MM-DD')).add(18,'M').format('YYYY-MM-DD');
    } else {
      this.eleveModele.date_fin_contrat = null;
    }
  }
  public initialiserEleveModele(){
    this.eleveModele = new Eleve();
    this.eleveModele.prenom ="";
    this.eleveModele.nom = "";
    this.eleveModele.numero_contrat = "";
    this.eleveModele.adresse = new Adresse();
    this.eleveModele.adresse.numero = null;
    this.eleveModele.adresse.rue = "";
    this.eleveModele.adresse.appartement = "";
    this.eleveModele.adresse.municipalite = "";
    this.eleveModele.adresse.province = "Québec";
    this.eleveModele.adresse.code_postal = "";
    this.eleveModele.coordonnee = new Coordonnee();
    this.eleveModele.coordonnee.telephone = "";
    this.eleveModele.coordonnee.telephone_autre = "";
  }

  subscribe(){
    this.cookiePremiereInscription = null;
    this.cookieService.set('subscribe-student', this.cookiePremiereInscription);
  }

  getPermission(){
    return this.cookiePremiereInscription;
  }

  setLanguage(){
    this.translate.setDefaultLang(this.lang);
  }

  toggleCondition(event){
    this.eleveModele.condition = event.checked;
  }
}
