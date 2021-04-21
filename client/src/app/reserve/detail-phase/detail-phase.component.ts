import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { phaseDetailModel } from 'src/app/eleve/detail/detail.component';
import { Adresse } from 'src/app/entite/adresse.entity';
import { Coordonnee } from 'src/app/entite/coordonnee.entity';
import { Eleve } from 'src/app/entite/eleve.entity';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import {_} from 'underscore';

@Component({
  selector: 'app-detail-phase',
  templateUrl: './detail-phase.component.html',
  styleUrls: ['./detail-phase.component.scss']
})
export class DetailPhaseComponent implements  OnInit {
  @Input() idEleve:number = 0;
  eleveModele:Eleve;
  
  phaseUne:phaseDetailModel;
  phaseDeux:phaseDetailModel;
  phaseTrois:phaseDetailModel;
  phaseQuatre:phaseDetailModel;

  constructor(private router:Router, 
        private serviceEleve:EleveService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private translate: TranslateService) { 
          this.translate.setDefaultLang('fr');
        }
  ngOnInit() {
    this.obtenirEleveById(this.idEleve);
    this.initialiserEleveModele();
    this.initialiserPhaseDetailModel();
    }

  public obtenirEleveById(id:number){
    if(id){
      this.serviceEleve.obtenirEleveByIdPublic(id).subscribe(eleve=>{
        this.eleveModele = eleve;
       // this.initialiserDate();
        this.initialiserPhases(eleve);
      });
    }
  }
  initialiserDate(){
    this.eleveModele.date_contrat = !this.eleveModele.date_contrat?null:new Date(this.eleveModele.date_contrat);
    this.eleveModele.date_inscription = !this.eleveModele.date_inscription?null:new Date(this.eleveModele.date_inscription);
    this.eleveModele.date_naissance = !this.eleveModele.date_naissance?null:new Date(this.eleveModele.date_naissance);
    this.eleveModele.date_fin_permis = !this.eleveModele.date_fin_permis?null:new Date(this.eleveModele.date_fin_permis);
  }
  public fermer(){
   this.router.navigate(["/eleves"]);
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

}

