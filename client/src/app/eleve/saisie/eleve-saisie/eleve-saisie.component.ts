import { Component, OnInit, Inject, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Eleve } from 'src/app/entite/eleve.entity';
import { Adresse } from 'src/app/entite/adresse.entity';
import { Coordonnee } from 'src/app/entite/coordonnee.entity';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { ToastrService } from 'ngx-toastr';
import {_} from 'underscore';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import moment from 'moment';
import { PeutEtreDeactivate } from 'src/app/service/changement-guard.service';

@Component({
  selector: 'app-eleve-saisie',
  templateUrl: './eleve-saisie.component.html',
  styleUrls: ['./eleve-saisie.component.scss']
})
export class EleveSaisieComponent implements OnInit,PeutEtreDeactivate {

  listeProvinces : any;
  eleveModele:Eleve;
  idEleve:number;
  action:string;
  model:any;

  baseUrl:any;
  @ViewChild('formulaire') formulaire:NgForm;

  constructor(private router:Router, 
        private serviceEleve:EleveService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        @Inject('BASE_URL') baseUrl: string,
        private translate:TranslateService) {
         this.translate.setDefaultLang('fr');
          this.baseUrl = baseUrl;
         }
  @HostListener('window:beforeunload')
  estPropre(): boolean | import("rxjs").Observable<boolean> {
    return !this.formulaire.form.dirty;
  }

  ngOnInit() {
    this.initialiserEleveModele();
    this.idEleve = +this.activatedRoute.snapshot.paramMap.get('id');
    this.obtenirEleveById(this.idEleve);
    this.listeProvinces = [
      { value: 'Québec', label: 'Québec' },
      { value: 'Ontario', label: 'Ontario' }
      ];
  
    }

  public obtenirEleveById(id:number){
    if(id){
      this.action = "Modifier";
      this.serviceEleve.obtenirEleveById(id).subscribe(eleve=>{
        this.eleveModele = eleve;
        this.eleveModele.payed = this.eleveModele.date_rappel_payement != null;
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
    this.formaterDate();
    this.serviceEleve.ajouterEleve(this.eleveModele).subscribe((eleve)=>{
      this.eleveModele.id = eleve.id;
      this.toastr.success("L'élève a été ajouté avec succés!", "Sauvegarde d'un élève", {timeOut: 5000});
      this.fermer();
    });
  }
  formaterDate(){
    this.eleveModele.date_inscription = !this.eleveModele.date_inscription?null:moment(this.eleveModele.date_inscription).format('YYYY-MM-DD');
    this.eleveModele.date_naissance = !this.eleveModele.date_naissance?null:moment(this.eleveModele.date_naissance).format('YYYY-MM-DD');
    this.eleveModele.date_contrat = !this.eleveModele.date_contrat?null:moment(this.eleveModele.date_contrat).format('YYYY-MM-DD');
    this.eleveModele.date_fin_permis = !this.eleveModele.date_fin_permis?null:moment(this.eleveModele.date_fin_permis).format('YYYY-MM-DD');
  }
  public fermer(){
    this.router.navigate(['/eleves']);
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
    this.eleveModele.adresse.province = "";
    this.eleveModele.adresse.code_postal = "";
    this.eleveModele.coordonnee = new Coordonnee();
    this.eleveModele.coordonnee.telephone = "";
    this.eleveModele.coordonnee.telephone_autre = "";
  }

  public onSelectionChanged(arg) {
    this.eleveModele.payed = arg.checked;
   }
   public onStatusChanged(arg) {
    this.eleveModele.status = arg.checked;
   }
}
