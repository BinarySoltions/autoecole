import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import { EleveService } from '../service/eleve/eleve.service';
import moment from 'moment';
import { ExamenModel } from '../modele/examen-model';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent implements OnInit,OnChanges {
  @Input() langue = 'fr'
  @Input() numeroIdentification = "";
  isStarting = false;
  sub:any;
  @ViewChild('formulaire') formulaire:NgForm;
  eventClickTelecharger: boolean;
  @ViewChild('pdf') pdf: ElementRef;
  hideTest: boolean;
  examenReponses:ExamenModel = new ExamenModel();

  constructor(private translate: TranslateService,private route:Router,private router:ActivatedRoute,
    private serviceEleve:EleveService) {
    this.translate.setDefaultLang('fr');
   }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.translate.setDefaultLang(this.langue);
  }

  ngOnInit() {
    this.translate.setDefaultLang(this.langue);
    // this.sub = this.router.params.subscribe(params =>{
    //   this.langue = params['lang'];
    //   this.numeroIdentification = params['numero'];
    //   this.translate.setDefaultLang(this.langue);
    // })
  }

  radioChange(choice){
    this.translate.setDefaultLang(choice.value);
  }
  commencer(){
    this.isStarting = true;
  }

  soumettre(){
   // const content = this.pdf.nativeElement.innerHTML;
    const dateNow = moment().format('YYYY-MM-DD');
    const content = JSON.stringify(this.examenReponses);
    let request = {numero:this.numeroIdentification,resultat:content,date_examen:dateNow,langue:this.langue};
    this.serviceEleve.soumettreExamen(request).subscribe(r=>{
      if(r.isValid){
        this.route.navigate(['session-terminer']);
      }
    })
  }

  public print(quality = 1,filename:string,i) {
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
