import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedServiceModule } from '../shared/shared/shared-service.module';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
  })
};
@Injectable({
  providedIn: SharedServiceModule
})
export class UploadFileService {

  // API url
  readonly apiUrl = environment.apiEndpoint;
    
  constructor(private http:HttpClient) { }
  
  // Returns an observable
  upload(file,group):Observable<any> {
  
      // Create form data
      const formData = new FormData(); 
        
      // Store form name as "file" with file data
      formData.append("file", file, file.name);
      formData.append("group", group.group);
      formData.append("lang", group.lang);
        
      // Make http post request over api
      // with formData as req
      return this.http.post(this.apiUrl+'upload', formData,httpOptions)
  }

   // Returns an observable
   getFiles():Observable<any> {
  
    return this.http.post<any>(this.apiUrl+'getFiles', "",httpOptions)
}

deleteFiles(req):Observable<any> {
  
  return this.http.post<any>(this.apiUrl+'deleteFiles', req,httpOptions)
}
getFilesByGroup(req):Observable<any> {
  
  return this.http.post<any>(this.apiUrl+'getFilesByGroup', req,httpOptions)
}
}
