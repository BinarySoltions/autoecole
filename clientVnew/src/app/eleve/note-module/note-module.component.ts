import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { EleveModule } from 'src/app/entite/eleve-module.entity';
import { Eleve } from 'src/app/entite/eleve.entity';
import { Module } from 'src/app/entite/module.entity';
import { AjouterNoteModel } from 'src/app/modele/ajouter-note.model';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { ErreurSortieService } from 'src/app/service/erreur-sortie.service';
import { ModuleService } from 'src/app/service/module/module.service';
export interface DialogData {
  listeEleves: any;
}

@Component({
  selector: 'app-note-module',
  templateUrl: './note-module.component.html',
  styleUrls: ['./note-module.component.scss']
})
export class NoteModuleComponent implements  OnInit {
  elevesChangeSubscribe : BehaviorSubject<Eleve[]>;
  dropdownListEleve:any = [];
  selectedItems = [];
  dropdownSettings = {};

  langue = 'fr';

  listeModules: Module[] = [];
  eleveModele:Eleve;
  //listeEleves:any;


  descControl= new FormControl("");
  form = new FormGroup({
    text:this.descControl,
    id_module:new FormControl(0,[Validators.required]),
    eleves:new FormControl([],[Validators.required])
  });
  phaseGroup: number[];
  selected=0;


  constructor(private serviceModule: ModuleService,
    public dialogRef: MatDialogRef<NoteModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviceEleve:EleveService,
    private translate: TranslateService, private toastr:ToastrService) {
    this.translate.setDefaultLang('fr');
    console.log('res listeeleves :',data)
    this.elevesChangeSubscribe?.subscribe(res=>{
      data.listeEleves = res;
      console.log('subscribe listeeleves :')
    });
  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nomcomplet',
      selectAllText: 'Cocher tout',
      unSelectAllText: 'Décocher tout',
      searchPlaceholderText:'Rechercher',
      allowSearchFilter: true,
      enableCheckAll:false
    };
    this.obtenirModules();
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  obtenirModules() {
    this.serviceModule.obtnenirModules().subscribe(m => {
      this.listeModules = m;
      this.phaseGroup = this.listeModules.map(m=> m.phase_id).filter((value, index, self) => self.indexOf(value) === index);
      console.log(m);
    });
  }



  soumettre() {
    console.log(this.form.value)
    const elevesId = this.form.get('eleves').value.map(e=>e.id);
    this.form.get('eleves').setValue(elevesId);
    this.serviceEleve.ajouterNoteSortie(this.form.value).subscribe(r=>{
      if(r && r.valid){
        this.toastr.success("Le module a été ajouté avec succés!","Information");
      } else{
        this.toastr.error("Une erreur est survenue lors de l'enregistement!");
      }
    })
  }


  supprimer() {
    this.dialogRef.close();
  }

  onModulesChange(event) {

  }

  disableModule(id){

  }

  getModules(phase){
    return this.listeModules.filter(m=>m.phase_id === phase);
  }
}
