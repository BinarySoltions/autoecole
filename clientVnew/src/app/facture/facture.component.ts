import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Adresse, AdresseEcole } from '../entite/adresse.entity';
import { Coordonnee } from '../entite/coordonnee.entity';
import { Ecole } from '../entite/ecole.entity';
import { Eleve } from '../entite/eleve.entity';
import { Payement } from '../payement/payement.model';
import { PayementService } from '../payement/payement.service';
import { EcoleService } from '../service/ecole/ecole.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalSendEmailComponent } from '../shared/modal-send-email/modal-send-email.component';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit ,AfterViewInit {
  eleve:Eleve = new Eleve();
  transactions:Payement[] = [];
  payement:Payement = new Payement();
  idEleve: number;
  @ViewChild('formulaire', { static: true }) formulaire:NgForm;
  types: { value: string; label: string; }[];


  TPS = 5;
  TVQ = 9.975;
  payementsPDF : Payement[];
  numeroFacture = "";
  dateDuJour = new Date();
  ecole = new Ecole();
  actionGenerer: boolean;
  totalPaye = 0;
  description:string;
  telephone:string;
  constructor(private servicePayement:PayementService,
      private activatedRoute:ActivatedRoute,
      private router:Router,
      private toastr: ToastrService,
      private translate:TranslateService,private spinner:NgxSpinnerService,
      private dialog:MatDialog,
      private serviceEcole:EcoleService) {
       this.translate.setDefaultLang('fr');
      }

  ngOnInit() {
    this.idEleve = +this.activatedRoute.snapshot.paramMap.get('id');
   // this.initialiserEcole();
   // this.initialiserEleve();

    this.types = [
      { value: 'Liquide', label: 'Liquide' },
      { value: 'Interac', label: 'Interac' },
      { value: 'Chèque', label: 'Chèque' },
      { value: 'Carte', label: 'Carte' }
      ];
      this.serviceEcole.obtenirEcole().subscribe(e =>{
        this.ecole = !e?new Ecole():e;
      })
  }
  ngAfterViewInit(): void {
  }
  formaterDate(){
    this.payement.date_payement = !this.payement.date_payement?null:moment(this.payement.date_payement).format('YYYY-MM-DD');
  }
  public initialiserEleve(){
    this.eleve = new Eleve();
    this.eleve.prenom ="";
    this.eleve.nom = "";
    this.eleve.numero_contrat = "";
    this.eleve.adresse = new Adresse();
    this.eleve.adresse.numero = null;
    this.eleve.adresse.rue = "";
    this.eleve.adresse.appartement = "";
    this.eleve.adresse.municipalite = "";
    this.eleve.adresse.province = "";
    this.eleve.adresse.code_postal = "";
    this.eleve.coordonnee = new Coordonnee();
    this.eleve.coordonnee.telephone = "";
    this.eleve.coordonnee.telephone_autre = "";
  }
  public initialiserEcole(){
    this.ecole = new Ecole();
    this.ecole.raison_social ="";
    this.ecole.nom = "";
    this.ecole.email = "";
    this.ecole.adresse = new AdresseEcole();
    this.ecole.adresse.numero = null;
    this.ecole.adresse.rue = "";
    this.ecole.adresse.appartement = "";
    this.ecole.adresse.municipalite = "";
    this.ecole.adresse.province = "";
    this.ecole.adresse.code_postal = "";
  }
  enregistrer(){
    this.formaterDate();
    this.prepareDetailPayment();
    this.imprimer();
  };

  prepareDetailPayment(){
    let detailJson = {nom:this.eleve.nom,prenom:this.eleve.prenom,telephone:this.telephone,description:this.description};
    this.payement.detail = JSON.stringify(detailJson);
  }

  genererFacture(){
    this.actionGenerer = !this.actionGenerer;
  }

  telChange(event){
    this.eleve.coordonnee = new Coordonnee();
    this.eleve.coordonnee.telephone = event.target.value;
  }

  detFacture(){
    this.eleve = JSON.parse(JSON.stringify(this.eleve))
  }
  imprimerOuEnvoyer(){
    const  dialogRef = this.dialog.open(ModalSendEmailComponent,{data:{email:"",required:true}});

     dialogRef.afterClosed().subscribe(result => {
       if(result && result.isSending){
         console.log(result)
         this.formaterDate();
         this.prepareDetailPayment();
         this.payement.facturePerso = true;
         this.payement.email = result.email;
         this.spinner.show(undefined, { fullScreen: true });
         this.servicePayement.envoyerFacture(this.payement).subscribe(response=>{
           this.toastr.success(response,"Facture");
           this.spinner.hide();
         });
       }else{
         console.log('result :',result)
       }

     });
   }
  imprimer(){
    //this.print(1,"facture",1);
    this.spinner.show(undefined, { fullScreen: true });
     this.servicePayement.genererFacturePersoPDF(this.payement).subscribe(response=>{
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
       tempLink.setAttribute('download', "facture_"+this.eleve.prenom+this.eleve.nom+"_"+this.eleve.numero_contrat+'.pdf');
       document.body.appendChild(tempLink);
       tempLink.click();
       document.body.removeChild(tempLink);
       //window.URL.revokeObjectURL(fileURL);
       var tab = window.open(fileURL,'fichier.pdf');
       this.spinner.hide();
     });
   }
}
