import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UploadFileService } from '../service/upload-file.service';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { object } from 'underscore';

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
  form = new FormGroup({
    group: this.groupControl,
    lang: this.langControl
  });

  nameFile: string = "Choisir un fichier";
 
  dragables = new Array(50);
  fileSelected : FileModel = new FileModel();
  filesDroped:any[] = [];

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
    this.loading = !this.loading;
    console.log(this.file);
    const group = this.form.get('group').value;
    const lang = this.form.get('lang').value;
    this.uploadFileService.upload(this.file, {group:group,lang:lang}).subscribe(
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

  drop(event: CdkDragDrop<any[]>) {
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    this.fileSelected = <FileModel>event.previousContainer.data[event.previousIndex];
    if(event.container.data.length<1){
     
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

  }
  }

  dropFile(event: CdkDragDrop<any[]>) {
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
   
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

  }
  getFiles() {
    this.spinner.show(undefined, { fullScreen: true });
    for (var i = 0; i < this.dragables.length; i++) {
      this.dragables[i] = new Array();
    }
    this.uploadFileService.getFiles().subscribe(res => {
      if (res) {
        for (var i = 0; i < res.length; i++) {
          let path = environment.pathPublic + environment.pathVariableStorage +res[i].path;
          this.dragables[i] = new Array({src:path, id:res[i].id,name:res[i].name,mime:res[i].mime,group:res[i].group_file});
        }
        this.spinner.hide();
      }
    })
  }

  clickBox(value){
    console.log(value);
  }

  supprimer(){
    console.log(this.filesDroped);
    let req = [];
    this.filesDroped.forEach(f => {req.push({id:f.id});});
   this.uploadFileService.deleteFiles(req).subscribe(res=>{
    if(res?.success){
      this.filesDroped = [];
    }
   })
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

}
