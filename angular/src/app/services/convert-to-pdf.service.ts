import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class ConvertToPdfService {
  constructor() {}

  tableHeadings: string[] = [];
  tableData: string[][] = [];
  pdfs: jsPDF[] = [];

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

  public convertToPDF(tableIds:string[], fileName:string = "data", noOfTables:number = 1,){
    let i: number = 0;
    let num = noOfTables;
    while (num > 0) {
      const doc = new jsPDF();
      this.getData(tableIds[i]);
      autoTable(doc, {
        theme: 'grid',
        head: [this.tableHeadings],
        body: [...this.tableData],
        startY: 15,

        margin: { horizontal: 10 },
        styles: { overflow: 'linebreak' },
        bodyStyles: { valign: 'top' },
        columnStyles: {
          //@ts-ignore
          email: { columnWidth: 'wrap' },
        },
        showHead: 'everyPage',
        didDrawPage: function (data) {
          // Header
          doc.setFontSize(16);
          doc.setTextColor('#161C22');
          doc.text(
            `${fileName.replaceAll('-', ' ').toUpperCase()}`,
            data.settings.margin.left,
            10
          );

          // Footer
          doc.setFontSize(8);

          let pageSize = doc.internal.pageSize;
          let pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();
          let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
          doc.text(
            'Customer success platform',
            data.settings.margin.left,
            pageHeight - 10
          );
          doc.text(data.pageNumber.toString(), pageWidth - 12, pageHeight - 10);
        },
      });
      this.pdfs[i] = doc;

      // reset the tableHeadings and tableData
      this.tableHeadings = [];
      this.tableData = [];

      num--;
      i++;
    }
    num = noOfTables;
    let j = 0;
    while (num > 0) {
      this.pdfs[j].addPage();
      this.pdfs[j].setPage(this.pdfs[j].getNumberOfPages());
      for (
        let index = 1;
        index <= this.pdfs[j + 1].getNumberOfPages();
        index++
      )
      {
          this.pdfs[j].addPage(this.pdfs[j+1].getPage(page));
      }

      j++;
      num--;
    }

    this.pdfs[0].save(`${fileName}.pdf`);
  }
}
