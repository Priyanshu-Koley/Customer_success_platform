import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class ConvertToPdfService {
  constructor() {}
  // defaultDisplay: string = 'flex';

  // public convertToPDF(ElementToPrint: string) {
  //   // Hide the display buttons
  //   // this.defaultDisplay = 'none';
  //   console.log('Printing...');

  //   let data: any = document.getElementById(ElementToPrint);
  //   html2canvas(data).then((canvas) => {
  //     // Few necessary setting options
  //     let imgWidth = 208;
  //     let pageHeight = 295;
  //     let imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;

  //     const contentDataURL = canvas.toDataURL('image/png');
  //     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  //     let position = 0;
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  //     pdf.save(`${ElementToPrint}.pdf`); // Generated PDF
  //   });

  //   // Redisplay the delete buttons
  //   // setTimeout(() => {
  //   //   this.defaultDisplay = 'flex';
  //   // }, 1000);
  // }

  tableHeadings: string[] = [];
  tableData: string[][] = [];

  private getData(tableId:string){
    const table = document.getElementById(tableId);
    if (table) {
      // Get table headings
      const thElements = table.querySelectorAll('th:not(:last-child)');
      thElements.forEach(th => {
        //@ts-ignore
        this.tableHeadings.push(th.textContent.trim());
      });
      
      // Get table data
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const tds = row.querySelectorAll('td:not(:last-child)'); // Select all <td> except the last one
        const tdArray:string[] = [];
        tds.forEach(td => {
          //@ts-ignore
          tdArray.push(td.textContent.trim()); // Pushing the text content of <td> into the array
        });
        this.tableData.push(tdArray); // Pushing array of <td> into the main array
      });
    }
  }

  public convertToPDF(tableId:string, fileName:string = "data"){
    const doc = new jsPDF();
    this.getData(tableId);
    autoTable(doc, {
      theme: 'grid',
      head: [this.tableHeadings],
      body: [...this.tableData],
    });
    doc.save(`${fileName}.pdf`);

    // reset the tableHeadings and tableData
    this.tableHeadings = [];
    this.tableData = [];
  }
}
