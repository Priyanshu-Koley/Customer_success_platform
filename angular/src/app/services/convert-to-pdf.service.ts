import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class ConvertToPdfService {
  constructor() {}
  // defaultDisplay: string = 'flex';

  public convertToPDF(ElementToPrint: string) {
    // Hide the display buttons
    // this.defaultDisplay = 'none';
    console.log('Printing...');

    let data: any = document.getElementById(ElementToPrint);
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(`${ElementToPrint}.pdf`); // Generated PDF
    });

    // Redisplay the delete buttons
    // setTimeout(() => {
    //   this.defaultDisplay = 'flex';
    // }, 1000);
  }
}
