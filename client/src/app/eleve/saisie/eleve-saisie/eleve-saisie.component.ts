import { Component, OnInit } from '@angular/core';
import core from 'src/app/core/core.json';
import lien from 'src/app/core/lien.json';
import { Router, ActivatedRoute } from '@angular/router';
import { Eleve } from 'src/app/entite/eleve.entity';
import { Adresse } from 'src/app/entite/adresse.entity';
import { Coordonnee } from 'src/app/entite/coordonnee.entity';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { ToastrService } from 'ngx-toastr';
import {_} from 'underscore';

@Component({
  selector: 'app-eleve-saisie',
  templateUrl: './eleve-saisie.component.html',
  styleUrls: ['./eleve-saisie.component.scss']
})
export class EleveSaisieComponent implements OnInit {

  listeProvinces : any;
  lien:any=lien;
  champ:any = core;
  eleveModele:Eleve;
  idEleve:number;
  action:string;
  model:any;

  constructor(private router:Router, 
        private serviceEleve:EleveService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService) {
         
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
      });
    }else{
      this.action = "Ajouter";
    }
  }
 
  public enregistrer(){
    this.serviceEleve.ajouterEleve(this.eleveModele).subscribe((eleve)=>{
      this.eleveModele.id = eleve.id;
      this.toastr.success("L'élève a été ajouté avec succés!", "Sauvegarde d'un élève", {timeOut: 5000});
      this.fermer();
    });
  }

  public fermer(){
    this.router.navigate([lien.url.eleve]);
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
