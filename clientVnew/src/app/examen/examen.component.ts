import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EleveService } from '../service/eleve/eleve.service';
import moment from 'moment';
import { ExamenModel } from '../modele/examen-model';
import {environment} from 'src/environments/environment';
import { getDocument, PDFDocumentProxy, ViewportParameters,PDFRenderParams,version} from 'pdfjs-dist';
import * as pdfjsLib from 'pdfjs-dist';
declare var $: any;
@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent implements OnInit,OnChanges,AfterViewInit {
  @Input() langue = 'fr'
  @Input() numeroIdentification = "";
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
    private serviceEleve:EleveService) {
    this.translate.setDefaultLang('fr');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
   }
  ngAfterViewInit(): void {
    this.index = 1;
    this.pdfToImageDataURLAsync(this.pdfSrc.url.url).then((x)=>{
      this.pdfTest = x;
      this.getPage();
    });
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.translate.setDefaultLang(this.langue);
  }

  ngOnInit() {
    this.index = 1;
   this.setUrl();
    this.translate.setDefaultLang(this.langue);
    
    // this.sub = this.router.params.subscribe(params =>{
    //   this.langue = params['lang'];
    //   this.numeroIdentification = params['numero'];
    //   this.translate.setDefaultLang(this.langue);
    // })/assets/Fr-Examen-C5-2020-10-21-GrandFormat-"+this.index+"
  }
  setUrl() {
    this.pdfSrc = {
      name: 'Angular 2',
      description: 'An amazing Angular 2 pdf',
      url: {
        url: environment.pathPublic+"images/examen/"+this.langue+"/"+this.reprise+"/1-27.pdf",
        url1: "/assets/Fr-Examen-C5-2020-10-21-GrandFormat-1-29.pdf",
        withCredentials: true
        }
      }
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
    let request = {numero:this.numeroIdentification,resultat:content,date_examen:dateNow,langue:this.langue};
    this.serviceEleve.soumettreExamen(request).subscribe(r=>{
      if(r.isValid){
        this.route.navigate(['public/session-terminer']);
      }
    })
    }
  }

  next(){
    this.index = this.index+1;
    if(this.index <= 27){
      //this.setUrl();
      this.getPage();
    }
  }

   // My use case demonstrating strongly typed usage.
   public async pdfToImageDataURLAsync(pdfFile: string): Promise<PDFDocumentProxy> {

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
      this.pdfToImageDataURLAsync(this.pdfSrc.url.url).then((x)=>{
        this.pdfTest = x;
        this.getPage();
      });
  }
}
