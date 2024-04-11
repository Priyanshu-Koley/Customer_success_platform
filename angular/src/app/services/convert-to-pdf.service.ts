import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PDFDocument, PDFPage } from 'pdf-lib';

@Injectable({
  providedIn: 'root',
})
export class ConvertToPdfService {
  constructor() { }

  tableHeadings: string[] = [];
  tableData: string[][] = [];
  pdfs: ArrayBuffer[] = [];
  currentPageNumber: number = 0;

  private getData(tableId: string) {
    const table = document.getElementById(tableId);
    if (table) {
      // Get table headings
      const thElements = table.querySelectorAll('th:not(:last-child)');
      thElements.forEach((th) => {
        //@ts-ignore
        this.tableHeadings.push(th.textContent.trim());
      });

      // Get table data
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach((row) => {
        const tds = row.querySelectorAll('td:not(:last-child)'); // Select all <td> except the last one
        const tdArray: string[] = [];
        tds.forEach((td) => {
          //@ts-ignore
          tdArray.push(td.textContent.trim()); // Pushing the text content of <td> into the array
        });
        this.tableData.push(tdArray); // Pushing array of <td> into the main array
      });
    }
  }

  public convertToPDF(
    tableIds: string[],
    fileName: string = 'data',
    noOfTables: number = 1
  ) {
    let i: number = 0;
    let num = noOfTables;
    let pgNo = this.currentPageNumber;
    let currentIndex = -1;
    

    while (num > 0) {
      const doc = new jsPDF();
      this.getData(tableIds[i]);
      
      autoTable(doc, {
        theme: 'grid',
        head: [this.tableHeadings],
        body: [...this.tableData],
        startY: 22,

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

          if (tableIds[0] == 'approved-team-table-1' && currentIndex != i) {
            // Sub-Header
            doc.setFontSize(10);
            doc.setTextColor('#2e3b47');
            doc.text(`Phase : ${i + 1}`, data.settings.margin.left, 17);
            currentIndex = i;
          }
          


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
          console.log(pgNo);
          console.log(data.pageNumber);
          
          doc.text((data.pageNumber+pgNo).toString(), pageWidth - 12, pageHeight - 10);
        },
      });

      this.pdfs[i] = doc.output('arraybuffer');
      
      // reset the tableHeadings and tableData
      this.tableHeadings = [];
      this.tableData = [];

      num--;
      i++;
      this.currentPageNumber += doc.getNumberOfPages();
      pgNo = this.currentPageNumber;
    }

    // this.pdfs[0].save(`${fileName}.pdf`);
    this.mergePdfs(this.pdfs).then((mergedPdf) => {
      this.downloadUint8ArrayAsPDF(mergedPdf, `${fileName}.pdf`);
      
    });
  }

  async mergePdfs(pdfsToMerge: ArrayBuffer[]): Promise<Uint8Array> {
    const mergedPdf: PDFDocument = await PDFDocument.create();

    const createInnerPromise = async (
      arrayBuffer: ArrayBuffer
    ): Promise<PDFPage[]> => {
      const pdf: PDFDocument = await PDFDocument.load(arrayBuffer);
      return await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    };

    const outerPromise: Promise<PDFPage[]>[] = pdfsToMerge.map(
      (arrayBuffer) => {
        const innerPromise: Promise<PDFPage[]> =
          createInnerPromise(arrayBuffer);
        return innerPromise;
      }
    );

    const resultOuterPromise: PDFPage[][] = await Promise.all(outerPromise);

    resultOuterPromise.forEach((pageArray: PDFPage[]) => {
      pageArray.forEach((page: PDFPage) => {
        mergedPdf.addPage(page);
      });
    });

    return await mergedPdf.save();
  }

  downloadUint8ArrayAsPDF(uint8Array: Uint8Array, filename: string): void {
    // Convert Uint8Array to a Blob
    const blob = new Blob([uint8Array], { type: 'application/pdf' });

    // Create a temporary anchor element
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = filename;

    // Trigger a click event on the anchor element
    downloadLink.dispatchEvent(new MouseEvent('click'));

    // Clean up
    window.URL.revokeObjectURL(downloadLink.href);
  }
}
