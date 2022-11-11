import { Component, OnInit } from '@angular/core';
import core from 'src/app/core/core.json';
import { EcoleService } from 'src/app/service/ecole/ecole.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Ecole } from 'src/app/entite/ecole.entity';
import { Router } from '@angular/router';
import { AdresseEcole } from 'src/app/entite/adresse.entity';
import * as _ from 'underscore';

@Component({
  selector: 'app-ecole-saisie',
  templateUrl: './ecole-saisie.component.html',
  styleUrls: ['./ecole-saisie.component.scss']
})
export class EcoleSaisieComponent implements OnInit {

  ecole:Ecole;
  listeProvinces:any = [];

  constructor(private serviceEcole:EcoleService,
    private translate:TranslateService,
    private toastr:ToastrService,
    private router: Router) { 
      this.translate.setDefaultLang('fr');
     
    }

  ngOnInit() {
    this.initialiserEcoleModel();
    this.serviceEcole.obtenirEcole().subscribe(res=>{
      if(_.has(res,"nom")){
        this.ecole = res;
      } 
    })
    this.listeProvinces = [
      { value: 'Québec', label: 'Québec' }
      ];
  }

  initialiserEcoleModel(){
    this.ecole = new Ecole;
    this.ecole.nom = "";
    this.ecole.raison_social = "";
    this.ecole.numero = "";
    this.ecole.email = "";
    this.ecole.adresse = new AdresseEcole;
    this.ecole.adresse.numero = null;
    this.ecole.adresse.rue = "";
    this.ecole.adresse.appartement = "";
    this.ecole.adresse.municipalite = "";
    this.ecole.adresse.province = "";
    this.ecole.adresse.code_postal = "";
  }
  enregistrer(){
    this.serviceEcole.AjouterEcole(this.ecole).subscribe(res=>{
      if(res){
        this.ecole = res;
        this.toastr.success("L'école a été enregistrée avec succés!","Information");
      }else{
        this.toastr.error("Une erreur est survenue lors de l'enregistrement!","Information");
      }
      
    });
  }

  fermer(){
    this.router.navigate(['/eleves']);
  }
}
