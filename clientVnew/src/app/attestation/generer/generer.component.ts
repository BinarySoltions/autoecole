import { Component, OnInit } from '@angular/core';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { EcoleService } from 'src/app/service/ecole/ecole.service';
import { PersonneResponsableService } from 'src/app/service/personne/responsable/personne-responsable.service';
import { Eleve } from 'src/app/entite/eleve.entity';
import { PersonneResponsable } from 'src/app/entite/personne-responsable.entity';
import { ActivatedRoute } from '@angular/router';
import { Ecole } from 'src/app/entite/ecole.entity';
import { Subject } from 'rxjs';
import { AttestationService } from 'src/app/service/attestation/attestation.service';
import { AttestationModel } from '../attestation/attestation.component';
import * as _ from 'underscore';

@Component({
  selector: 'app-generer',
  templateUrl: './generer.component.html',
  styleUrls: ['./generer.component.scss']
})
export class GenererComponent implements OnInit {
  numeroAttestation : string="";
  idEleve:number;
  estVisible : boolean = false;
  public eventsSubject: Subject<string> = new Subject<string>();
  attestation:AttestationModel;

  
  constructor(
    private activatedRoute:ActivatedRoute,
    private serviceAttestation:AttestationService) { }

  ngOnInit() {
    this.idEleve = +this.activatedRoute.snapshot.paramMap.get('id');
    this.initialiserAttestation();
    this.obtenirAttestationById(this.idEleve);
  }
  ajouter(){
    this.estVisible = true;
    this.eventsSubject.next(this.numeroAttestation);
  }
  obtenirAttestationById(id){
    this.serviceAttestation.obtenirAttestationById(id).subscribe(res=>{
      if(_.has(res,'id')){
        this.attestation = res;
        this.attestation.numero = res.numero;
        this.eventsSubject.next(this.attestation.numero);
      }
    })
  }

  initialiserAttestation(){
    this.attestation = new AttestationModel;
    this.attestation.eleve_id = null;
    this.attestation.ecole_id = null;
    this.attestation.numero = "";
    this.attestation.personne_responsable2_id = null;
    this.attestation.personne_responsable_id = null;
    this.attestation.resultat_final = 0;
    this.attestation.resultat_phase_une = 0;
  }
}
