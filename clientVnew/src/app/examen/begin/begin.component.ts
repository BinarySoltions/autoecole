import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss']
})
export class BeginComponent implements OnInit,OnDestroy {
  langue = 'fr'
  numeroIdentification = "";
  isStarting = false;
  @ViewChild('formulaire') formulaire:NgForm;
  sub: any;

  constructor(private translate: TranslateService, private route:Router,private router:ActivatedRoute,
    private serviceEleve:EleveService,private spinner:NgxSpinnerService,) {
    this.translate.setDefaultLang('fr');
   }

  ngOnInit() {
    this.sub = this.router.params.subscribe(params =>{
      this.numeroIdentification = params['numero'];
      this.langue = params['langue'];
      if(!!this.numeroIdentification && !!this.langue){
        this.commencer();
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  radioChange(choice){
    this.translate.setDefaultLang(choice.value);
  }

  commencer(){
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceEleve.verifierExamen(this.numeroIdentification).subscribe(r=>{
      if(r){
        this.isStarting = true;
      }
      this.spinner.hide();
    })
    this.route.navigate(['public/examen',this.numeroIdentification,this.langue]);
  }

}
