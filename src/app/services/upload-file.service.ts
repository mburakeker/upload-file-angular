import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiResponse } from './base-api-response';
import { FileItem } from './file-item';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const request = new HttpRequest('POST', `${this.baseUrl}/api/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(request);
  }

  getFiles(): Observable<any> {
     return this.http.get(`${this.baseUrl}/api/upload`);
  }
  getFileByName(fileName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/upload/${fileName}`, { responseType: 'blob' });
  }
}
