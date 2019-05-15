import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import * as $ from 'jquery';
var JsBarcode = require('jsbarcode');
// @Component({
//   selector: 'app-attestation',
//   templateUrl: './attestation.component.html',
//   styleUrls: ['./attestation.component.scss']
// })

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.scss'],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})
export class AttestationComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {
    JsBarcode("#barcode", "00597587", {
      format: "CODE128C",
      width: 2.5,
      height: 40,
      displayValue: false
    });
  }

  constructor(
    @Inject('Window') private window: Window,
    ) { 
      
    }

  ngOnInit() {
    
  }
  
  download() {
      this.print(2);


        // var doc = new jsPDF();
        // doc.text(20, 20, 'Hello world!');
        // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
        // doc.addPage();
        // doc.text(20, 20, 'Do you like that?');

        // // Save the PDF
        // doc.save('Test.pdf');
    }

    public print(quality = 1) {
      const filename  = 'attestation_test.pdf';
  
      html2canvas(document.querySelector('#pdf'), 
                  {scale: quality}
               ).then(canvas => {
        let pdf = new jsPDF('p', 'pt', 'letter');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 612, 792);
        pdf.save(filename);
      });
    }
}
