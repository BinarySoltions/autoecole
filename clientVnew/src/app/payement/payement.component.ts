import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PayementService } from './payement.service';
import { Payement } from './payement.model';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { Eleve } from '../entite/eleve.entity';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { EcoleService } from '../service/ecole/ecole.service';
import { Ecole } from '../entite/ecole.entity';
import { AdresseEcole, Adresse } from '../entite/adresse.entity';
import { Coordonnee } from '../entite/coordonnee.entity';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss'],
  providers:[PayementService]
})
export class PayementComponent implements OnInit,AfterViewInit {
  eleve:Eleve = new Eleve();
  transactions:Payement[] = [];
  payement:Payement = new Payement();
  idEleve: number;
  @ViewChild('formulaire', { static: true }) formulaire:NgForm;
  types: { value: string; label: string; }[];
  displayedColumns: string[] = ['type', 'date_payement', 'montant','choix'];
  dataSource = new MatTableDataSource<Payement>(this.transactions);
  selection = new SelectionModel<Payement>(true, []);
  TPS = 5;
  TVQ = 9.975;
  payementsPDF : Payement[];
  numeroFacture = "";
  dateDuJour = new Date();
  ecole = new Ecole();
  actionGenerer: boolean;
  totalPaye = 0;
  constructor(private servicePayement:PayementService, 
      private activatedRoute:ActivatedRoute,
      private router:Router, 
      private toastr: ToastrService,
      private translate:TranslateService,
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
    this.servicePayement.obtnenirPayements(this.idEleve).subscribe(res=>{
      if(res){
        this.eleve = res;
        this.transactions = this.eleve.payements;
        this.dataSource.data = this.transactions;
        this.numeroFacture = this.eleve.numero_contrat;
        this.getTotalCost();
      }
    });
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
    this.payement.eleve_id = this.idEleve;
    this.servicePayement.ajouterPayement(this.payement).subscribe(res=>{
      if(res){
        this.eleve = res;
        this.transactions = this.eleve.payements;
        this.payement = new Payement();
        this.dataSource = new MatTableDataSource<Payement>(this.transactions);
        this.getTotalCost();
      }
    })
  };

  getTotalCost(){
    let total = 0;
    this.dataSource.data.forEach(p=>total = total + Number(p.montant));
    this.totalPaye =  total;
  }
    clickSelect(value){
      value.stopPropagation();
    }
   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    if (this.selection.selected.length){
      this.payementsPDF = this.selection.selected;
    }
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Payement): string {
    if (this.selection.selected.length){
      this.payementsPDF = this.selection.selected;
    }
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }

  genererFacture(){
    this.actionGenerer = !this.actionGenerer;
  }
}
