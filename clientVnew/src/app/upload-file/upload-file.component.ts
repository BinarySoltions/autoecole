import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UploadFileService } from '../service/upload-file.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSelectionList } from '@angular/material/list';
declare var $: any;

export class FileModel {
  id: number;
  name: string;
  path: string;
  group_file: string;
  path_thumbnail: string;
  mime:string;
  lang:string;
}

export class ValueLabel{
  constructor(
    public value: string,
    public label: string
  ) {}
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadFileComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('filesSelected') filesSelected: MatSelectionList;
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  groups: any[] = [
    "Groupe", "Examen", "Flyers","Stationnement","FlyersTarif","FlyersPerfectionnement"
  ];
  languages: ValueLabel[];
  groupControl = new FormControl(this.groups[0]);
  langControl = new FormControl("fr");
  descControl= new FormControl("");
  form = new FormGroup({
    group: this.groupControl,
    lang: this.langControl,
    description:this.descControl
  });

  nameFile: string = "Choisir un fichier";
 
  dragables = new Array(50);
  fileSelected : FileModel = new FileModel();
  // Inject service 
  constructor(private uploadFileService: UploadFileService,private translate: TranslateService,
    private spinner:NgxSpinnerService,) 
  { 
    this.translate.setDefaultLang('fr');
  }

  ngOnInit(): void {
    this.languages = [
      new ValueLabel('fr','FR'),
      new ValueLabel( 'eng','ENG' )
    ];
    this.getFiles();
  }

  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
    this.nameFile = this.file ? this.file.name : "Choisir un fichier";
  }

  // OnClick of button Upload
  onUpload() {
    this.spinner.show(undefined, { fullScreen: true });
    const group = this.form.get('group').value;
    const lang = this.form.get('lang').value;
    const desc = this.form.get('description').value;

    this.uploadFileService.upload(this.file, {group:group,lang:lang,description:desc}).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.nameFile = "Choisir un fichier";
 
          this.getFiles();

          this.loading = false; // Flag variable 
        }
        this.spinner.hide();
      }
    
    );
  }

  fakeUpload() {
    this.fileInput.nativeElement.click();
  }

  getFiles() {
    this.spinner.show(undefined, { fullScreen: true });
    this.dragables=[];
    this.uploadFileService.getFiles().subscribe(res => {
      if (res) {
        for (var i = 0; i < res.length; i++) {
          let path = environment.pathPublic + environment.pathVariableStorage +res[i].path;
          this.dragables.push({src:path, id:res[i].id,name:res[i].name,mime:res[i].mime,group:res[i].group_file});
        }
        this.spinner.hide();
      }
    })
  }

  clickBox(value){
    console.log(value);
  }

  supprimer(){
    $("#confirmerModal").modal('show');
  }

  getImageName(value){
    let pos = value.indexOf("_");
    if(pos != -1){
      return value.substring(pos+1);
    }
   
  }
  getSource(file){
    return "application/pdf".localeCompare(file.mime) == 0?environment.pathPublic+'imagepdf.png':
    file.src;
  }

  isDeleted(){
    return !this.filesSelected?.selectedOptions.selected.length;
  }

  soumettre(){
  
   
  }

  confirmerSoummission(value){
    if(value){
      const filesSelected = this.filesSelected.selectedOptions.selected
      console.log(filesSelected);
      let req = [];
      filesSelected.forEach(f =>{
      req.push({id:f.value.id});});
     this.uploadFileService.deleteFiles(req).subscribe(res=>{
      if(res?.success){
       this.getFiles();
      }
     })
    }
  }
}
