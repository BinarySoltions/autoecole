import { Component, OnInit,ViewEncapsulation,Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UploadFileService } from 'src/app/service/upload-file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-display-file',
  templateUrl: './display-file.component.html',
  styleUrls: ['./display-file.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DisplayFileComponent implements OnInit , OnChanges{
  @Input() group = "";
  @Input() lang = "fr";
  dragables = [];
  constructor(private uploadFileService: UploadFileService ,
    private translate: TranslateService) { 
    this.translate.setDefaultLang('fr');
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getFiles();
  }
  ngOnInit(): void {
    this.getFiles();
  }

  getFiles() {
    console.log({group:this.group,lang:this.lang})
    this.uploadFileService.getFilesByGroup({group:this.group,lang:this.lang }).subscribe(res => {
      console.log(res)
      if (res) {
        this.dragables = [];
        for (var i = 0; i < res.length; i++) {
          let path = environment.pathPublic +environment.pathVariableStorage +res[i].path;
          this.dragables[i] = {src:path, id:res[i].id,name:res[i].name,mime:res[i].mime};
        }
      }
    })
  }

  getImageName(value){
    let pos = value?.indexOf("_");
    if(pos != -1){
      return value?.substring(pos+1);
    }
   
  }
  getSource(file){
    return "application/pdf".localeCompare(file?.mime) == 0?environment.pathPublic+'imagepdf.png':
    file?.src;
  }
}
