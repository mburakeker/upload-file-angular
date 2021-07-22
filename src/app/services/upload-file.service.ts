import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const request = new HttpRequest(
      'POST',
      `${environment.apiUrl}/api/upload`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(request);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/upload`);
  }
  getFileByName(fileName: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/upload/${fileName}`, {
      responseType: 'blob',
    });
  }
}
