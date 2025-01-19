import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf',
  imports: [CommonModule, FormsModule],
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
  standalone:true
})

export class PdfComponent {

  downloadPDF() {
    const element = document.getElementById('pdf-content');
    
    if (element) {
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const options = { scale: 2, useCORS: true };
  
      html2canvas(element, options).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        // Add the first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        // Add additional pages for overflowing content
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save('itinerary-details.pdf');
      });
    }
  }
  
  
  
  
}

