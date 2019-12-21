import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    if(json){
    var merge = XLSX.utils.decode_range("D1:G1"); // this is equivalent
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    if(!worksheet['!merges']) worksheet['!merges'] = [];
    worksheet['!merges'].push(merge);
    this.gererColonne(worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
    }
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
  private gererColonne(ws:XLSX.WorkSheet){
    ws["A1"].v="DATE D'INSCRIPTION / DATE OF REGISTRATION";
    ws["B1"].v="NOM / LAST NAME";
    ws["C1"].v="PRÉNOM / FIRST NAME";
    ws["D1"].v="ADRESSE / ADDRESS (numéro,rue,ville,code postal) / ( number,street,city,postal code)";
    ws["H1"].v="COURRIEL / EMAIL";
    ws["I1"].v="NUMÉRO DE TÉLÉPHONE / PHONE NUMBER";
    ws["J1"].v="DATE DE NAISSANCE / DATE OF BIRTH";
    ws["K1"].v="NUMÉRO DE PERMIS CONDUIRE / NUMBER OF DRIVING LICENCE";
    ws["L1"].v="NUMÉRO DE CONTRAT-THÉORIE / CONTRACT NUMBER - THEORY ";
    ws["M1"].v="NUMÉRO DE CONTRAT-PRATIQUE / CONTRACT NUMBER - PRACTICE ";
    ws["N1"].v="NUMÉRO DE L'ATTESTATION / NUMBER OF ATTESTATION";
  }
}
