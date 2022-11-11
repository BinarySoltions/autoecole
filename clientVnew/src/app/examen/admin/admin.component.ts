import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { ToastrService } from 'ngx-toastr';
import { ExamenModel } from 'src/app/modele/examen-model';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit,OnDestroy {
  examenReponses:ExamenModel = new ExamenModel();
  idExamen = 0;
  isStarting = false;
  sub:any;
  @ViewChild('formulaire', { static: true }) formulaire:NgForm;
  eventClickTelecharger: boolean;
  @ViewChild('pdf', { static: true }) pdf: ElementRef;
  hideTest: boolean;
  eleveId: any;

  constructor(private translate: TranslateService,private route:Router,private router:ActivatedRoute,
    private serviceEleve:EleveService, private toastr: ToastrService,private spinner:NgxSpinnerService,) {
    this.translate.setDefaultLang('fr');
   }

  ngOnInit() {
  
    this.sub = this.router.params.subscribe(params =>{
      this.idExamen = +params['id'];
      this.obtenirExam(this.idExamen);
    })
    
  }

  obtenirExam(val){
    this.serviceEleve.obtenirExamenById(val).subscribe(r=>{
      if(r){
        this.eleveId = r.eleve_id;
        this.examenReponses = <ExamenModel>JSON.parse(r.resultat);
        this.translate.setDefaultLang(r.langue);
      }else {
        this.toastr.error("Une erreur est survenue!", "Obtenir un examen", {timeOut: 5000});
      }
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  soumettre(){
    const content = JSON.stringify(this.examenReponses);
    let request = {id:this.idExamen,resultat:content};
    this.serviceEleve.modifierExamen(request).subscribe(r=>{
      if(r.isValid){
        this.toastr.success("L'examen a été modifié avec succés!", "Sauvegarde d'un élève", {timeOut: 5000});
      } else {
        this.toastr.error("Une erreur est survenue!", "Modifier un examen", {timeOut: 5000});
      }
    })
    
  }
 imprimer(){
  //this.print(1,'test_examen',1);
  let req = {id:this.idExamen};
  this.spinner.show(undefined, { fullScreen: true });
  this.serviceEleve.genererExamenPDF(req).subscribe(response=>{
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
    tempLink.setAttribute('download', "examen_"+this.examenReponses.nomComplet+".pdf");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(fileURL);
    //var tab = window.open(fileURL,'_blank');
    this.spinner.hide();
  });
 }


  reourner(){
    this.route.navigate(['liste-examen',this.eleveId])
  }
}
