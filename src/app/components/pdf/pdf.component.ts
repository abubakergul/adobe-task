import { Component, OnInit } from '@angular/core';
import { ViewSDKClient } from '../../../view-sdk.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
})
export class PdfComponent {
  constructor(private viewSDKClient: ViewSDKClient) {}

  // Helper function to check if selected file is PDF or not.
  isValidPDF(file: File) {
    if (file.type === 'application/pdf') {
      return true;
    }
    if (file.type === '' && file.name) {
      const fileName = file.name;
      const lastDotIndex = fileName.lastIndexOf('.');
      if (
        lastDotIndex === -1 ||
        fileName.substr(lastDotIndex).toUpperCase() !== 'PDF'
      ) {
        return false;
      }
      return true;
    }
    return false;
  }

  /* Helper function to be executed on file upload
   * for creating Promise which resolve to ArrayBuffer of file data.
   **/
  onFileUpload(files: File[]) {
    this.viewSDKClient.ready().then(() => {
      if (files.length > 0 && this.isValidPDF(files[0])) {
        const fileName = files[0].name;
        const reader = new FileReader();
        reader.onloadend = (e) => {
          const filePromise = Promise.resolve(e.target?.result);
          /* Helper function to render the file using PDF Embed API. */
          this.viewSDKClient.previewFileUsingFilePromise(
            'pdf-div',
            filePromise,
            fileName
          );
        };
        reader.readAsArrayBuffer(files[0]);
      }
    });
  }
}
