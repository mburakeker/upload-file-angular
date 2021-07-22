import { Component, Input } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  @Input() allow: Array<string> = [];

  files : any = [];
  constructor(private uploadFileService: UploadFileService) { }

  handleFileSelect(files: FileList): void {
    this.files = files;
  }
  handleUploadFile(file: any): void {
    if (this.allow && this.allow.indexOf(file.name.split('.').pop()) === -1) {
      alert(`Invalid file type! File must be one of these extensions: ${this.allow.join(', ')}`);
      return;
    }
    this.uploadFileService.upload(file).subscribe(data => {
      console.log(data);
    }
  );

  }

}
