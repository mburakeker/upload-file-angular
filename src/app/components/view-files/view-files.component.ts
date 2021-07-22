import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FileItem } from 'src/app/services/file-item';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css'],
})
export class ViewFilesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'type',
    'size',
    'lastModifiedDate',
    'download',
  ];
  constructor(private uploadFileService: UploadFileService) {}
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.handleListFiles();
  }
  handleListFiles(): void {
    this.uploadFileService.getFiles().subscribe((data) => {
      if (data.itemCount > 0) {
        this.dataSource = new MatTableDataSource<FileItem>(data.dataList);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  handleDownloadFile(filename: string, type: string): void {
    this.uploadFileService
      .getFileByName(filename)
      .subscribe((data) => this.downloadFile(data, type));
  }
  downloadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your pop-up blocker and try again.');
    }
  }
}
