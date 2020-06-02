import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import { ToastrService } from 'ngx-toastr';
import { ReponseModel, ExamenModel } from 'src/app/modele/examen-model';


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
  @ViewChild('formulaire') formulaire:NgForm;
  eventClickTelecharger: boolean;
  @ViewChild('pdf') pdf: ElementRef;
  hideTest: boolean;

  constructor(private translate: TranslateService,private route:Router,private router:ActivatedRoute,
    private serviceEleve:EleveService, private toastr: ToastrService,) {
    this.translate.setDefaultLang('fr');
   }

  ngOnInit() {
  
    this.sub = this.router.params.subscribe(params =>{
      this.idExamen = +params['id'];
      this.obtenirExam(this.idExamen);
    })
    
  }

  obtenirExam(val){
    this.serviceEleve.obtenirExamen(val).subscribe(r=>{
      if(r){
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
  this.print(1,'test_examen',1);
 }
  print(quality = 1,filename:string,i) {
    this.eventClickTelecharger = true;
    filename  = filename+'.pdf';
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

}
