import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EleveService } from '../service/eleve/eleve.service';
import moment from 'moment';
import { ExamenModel } from '../modele/examen-model';
import { getDocument, PDFDocumentProxy, ViewportParameters,PDFRenderParams,version} from 'pdfjs-dist';
import * as pdfjsLib from 'pdfjs-dist';
import { AuthenticationService } from '../auth/services/authentication.service';

declare var $: any;
@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent implements OnInit,OnChanges,AfterViewInit {
  @Input() langue = 'fr'
  @Input() numeroIdentification = "";
  @Input() data:any;
  isStarting = false;
  sub:any;
  @ViewChild('formulaire', { static: true }) formulaire:NgForm;
  eventClickTelecharger: boolean;
  @ViewChild('pdf', { static: true }) pdf: ElementRef;
  hideTest: boolean;
  examenReponses:ExamenModel = new ExamenModel();
  pdfSrc: any;
  index: number;
  private document: Document;
  @ViewChild('myCanvas', { static: true }) myCanvas: ElementRef<HTMLCanvasElement>;
  pdfTest : PDFDocumentProxy;
  reprise = "";

  constructor(private translate: TranslateService,private route:Router,private router:ActivatedRoute,
    private authService:AuthenticationService,
    private serviceEleve:EleveService) {
    this.translate.setDefaultLang('fr');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
   }
  ngAfterViewInit(): void {
    this.index = 1;
    this.setUrl();
    this.obtenirPdfExam();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(!!this.langue){
      this.translate.setDefaultLang(this.langue);
    }
    if(this.data){
      this.examenReponses.date = moment(this.data.date_examen).format('YYYY-MM-DD');
      this.examenReponses.nomComplet = this.data.eleve.nom + " " +this.data.eleve.prenom;
      this.examenReponses.numeroTest = this.data.nom;
      this.examenReponses.nomEcole = "PCONDUITE";
      this.getExamenPrise();
    }

  }

  ngOnInit() {
    this.index = 1;

   if(!!this.langue){
    this.setUrl();
    this.translate.setDefaultLang(this.langue);
  }
  }


  obtenirPdfExam(){
    this.serviceEleve.getUrlExam(this.pdfSrc).subscribe((res:any)=>{
      let a = res.split("\r\n\r\n")
         const byteCharacters = atob(a[1]);
         const byteNumbers = new Array(byteCharacters.length);
         for (let i = 0; i < byteCharacters.length; i++) {
           byteNumbers[i] = byteCharacters.charCodeAt(i);
         }
         const byteArray = new Uint8Array(byteNumbers);
      const data =  byteArray;
      console.log(" data : ", data)
      this.pdfToImageDataURLAsync(data).then((x)=>{
        this.pdfTest = x;
        this.getPage();
      });
    })
  }

  setUrl() {
    let group = "Examen";
    if(this.reprise=="1"){
        group = "ExamenRepriseUne"
    }
    this.pdfSrc = {group:group,lang:this.langue};
    /*this.pdfSrc = {
      name: 'Angular 2',
      description: 'An amazing Angular 2 pdf',
      url: {
        url: environment.pathPublic+"images/examen/"+this.langue+"/"+this.reprise+"/1-27.pdf",
        url1: "/assets/Fr-Examen-C5-2020-10-21-GrandFormat-1-29.pdf",
        urlpdf: this.reprise,
        withCredentials: true
        }
      }*/
  }

  radioChange(choice){
    this.translate.setDefaultLang(choice.value);
  }
  commencer(){
    this.isStarting = true;
  }

  soumettre(){
    $("#confirmerModal").modal('show');

  }

  confirmerSoummission(value){
    if(value){
      // const content = this.pdf.nativeElement.innerHTML;
    const dateNow = moment().format('YYYY-MM-DD');
    const content = JSON.stringify(this.examenReponses);
    let request = {numero:this.numeroIdentification,resultat:content,date_examen:dateNow,langue:this.langue,temp:false};
    this.serviceEleve.soumettreExamen(request).subscribe(r=>{
      if(r.isValid){
        this.route.navigate(['public/session-terminer']);
      }
    })
    }
  }

  saveTemporairement(){
    const dateNow = moment().format('YYYY-MM-DD');
    const content = JSON.stringify(this.examenReponses);
    let request = {numero:this.numeroIdentification,resultat:content,date_examen:dateNow,langue:this.langue,temp:true};
    this.serviceEleve.soumettreExamen(request).subscribe(r=>{
      if(r.isValid){
        //this.route.navigate(['public/session-terminer']);
      }
    })
  }
  next(){
    this.index = this.index+1;
    if(this.index <= 27){
      //this.setUrl();
      this.getPage();
      if(this.index>11){
        this.saveTemporairement();
      }
    }
  }

   // My use case demonstrating strongly typed usage.
   public async pdfToImageDataURLAsync(pdfFile: any): Promise<PDFDocumentProxy> {

    const pdf: PDFDocumentProxy = await getDocument(pdfFile).promise;
    //if (pdf != null) pdf.destroy();
    return pdf;
  }

  public async getPage(){
    const canvas = this.myCanvas.nativeElement;
    let  ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const page = await this.pdfTest.getPage(this.index);

    const viewPortParams: ViewportParameters = { scale: 1 };
    const viewport = page.getViewport(viewPortParams);

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext: PDFRenderParams = {
      canvasContext: ctx,
      viewport: viewport
    };

    const renderedPage = await page.render(renderContext).promise;
    const res = canvas.toDataURL();

    return res;
  }

  repriseEvent(event,value){
    console.log(" reriser ",value)
    if(this.index > 1){
      return;
    }
    this.reprise = "";
    if(event == true){
        this.reprise = value;
    }else if(value == 3 && Number(event)>0){
      this.reprise = '3';
    }
      this.index = 1;
      this.setUrl();
      this.obtenirPdfExam()
  }

  getExamenPrise(){
    console.log(" reprise une fois", this.data.prise==2, this.data.prise)
    if(this.data.prise==2){
      this.examenReponses.reprise.uneFois = true;
      this.examenReponses.reprise.deuxFois =  false;
      this.examenReponses.reprise.nFois =  null;
      this.repriseEvent(this.examenReponses.reprise.uneFois,1);
    } else if(this.data.prise==3){
      this.examenReponses.reprise.deuxFois = true;
      this.examenReponses.reprise.uneFois = false;
      this.examenReponses.reprise.nFois =  null;
      this.repriseEvent(this.examenReponses.reprise.deuxFois,2);
    }
  }
}
