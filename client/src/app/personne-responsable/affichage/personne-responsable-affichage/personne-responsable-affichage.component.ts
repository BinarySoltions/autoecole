import { Component, OnInit } from '@angular/core';
import { PersonneResponsable } from 'src/app/entite/personne-responsable.entity';
import { TranslateService } from '@ngx-translate/core';
import { PersonneResponsableService } from 'src/app/service/personne/responsable/personne-responsable.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personne-responsable-affichage',
  templateUrl: './personne-responsable-affichage.component.html',
  styleUrls: ['./personne-responsable-affichage.component.less']
})
export class PersonneResponsableAffichageComponent implements OnInit {
 
  personneResponsable: PersonneResponsable = new PersonneResponsable;
  listePersonneResponsable: PersonneResponsable[] = [];
  message = {
    'emptyMessage': 'Pas de données disponibles.',
    'totalMessage': ''
  };

  constructor(private translate: TranslateService,
    private servicePersonneResponsable:PersonneResponsableService,
    private toastr:ToastrService) {
      this.translate.setDefaultLang('fr');
     }

  ngOnInit() {
    this.servicePersonneResponsable.obtnenirPersonnesResponsables().subscribe(res=>{
      this.listePersonneResponsable = res;
    });
  }
  
ajouter(){
this.servicePersonneResponsable.ajouterPersonneResponsable(this.personneResponsable).subscribe(res=>{
  if(res){
    this.listePersonneResponsable = res;
    this.toastr.success("L'école a été ajouté avec succés!","Information");
  }else{
    this.toastr.error("Une erreur est survenue lors de l'enregistrement!","Information");
  }
});
}
  
}
