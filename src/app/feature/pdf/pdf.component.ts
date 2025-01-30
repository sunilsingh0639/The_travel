import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-pdf',
  imports: [CommonModule, FormsModule],
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
  standalone: true,
  providers: [DatePipe]
})

export class PdfComponent implements OnInit {
  data: any;
  formattedDate: any;
  totalNumberOfNights: number = 0;
  totalPrice: any;
  today: Date = new Date();
  totalRooms: number = 0;
  constructor(private _spinner: SpinnerService, private datePipe: DatePipe, private http: HttpClient) { }

  ngOnInit(): void {
    const storedData = sessionStorage.getItem('pdfData');
    this.data = storedData ? JSON.parse(storedData) : null;
    const price = this.data.paymentGetway[0].price
    const numberOfMember = this.data.paymentGetway[0].numberOfMember
    this.totalPrice = this.data.paymentGetway[1];
    this.formattedDate = this.data?.tripDetails[0].leavingDate;
    this.formattedDate = this.datePipe.transform(this.formattedDate, 'd MMM yyyy');
    this.totalNumberOfNights = this.data?.tripItinery.cities?.reduce((total:any, city:any) => {
      const nights = parseInt(city.numberOfNights, 10);
      return total + (isNaN(nights) ? 0 : nights);
    }, 0);
    this.totalRooms = this.data?.tripItinery.cities?.reduce((total:any, city:any) => total + city.numberOfRoom, 0);
    console.log(this.data);
  }
  downloadPDF() {
    const element = document.getElementById('pdf-content');

    if (element) {
      this._spinner.show();
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
        this._spinner.hide();
      }).catch((error) => {
        console.error('Error generating PDF', error);
        this._spinner.hide();
      });
    }
  }
  // downloadPDF() {
  //   const data = {
  //     title: 'My Custom PDF',
  //     content: 'Hello, this is a dynamically generated PDF file using pdf-lib.\nYou can copy this text!',
  //   };
  
  //   this.http.post('generate-pdf', data, { responseType: 'blob' })
  //     .subscribe(response => {
  //       const blob = new Blob([response], { type: 'application/pdf' });
  //       const link = document.createElement('a');
  //       link.href = window.URL.createObjectURL(blob);
  //       link.download = 'my-pdf.pdf';
  //       link.click();
  //     }, error => {
  //       console.error('Error downloading PDF:', error);
  //     });
  // }
  
  // downloadPDF() {
  //   const element = document.getElementById('pdf-content');
  
  //   if (element) {
  //     this._spinner.show();
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  
  //     pdf.html(element, {
  //       callback: (pdf) => {
  //         pdf.save('itinerary-details.pdf');
  //         this._spinner.hide();
  //       },
  //       x: 10,
  //       y: 10,
  //       width: 190,
  //       windowWidth: element.scrollWidth, 
  //     });
  //   }
  // }



}

