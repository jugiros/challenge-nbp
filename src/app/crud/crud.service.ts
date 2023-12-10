import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConfig} from "../config/config";

export class CrudService<T> {
  constructor(protected http: HttpClient, protected apiUrl: string) {}

  private generateHeaders(): HttpHeaders {
    return new HttpHeaders().set('authorId', AppConfig.authorId);
  }

  getAll(): Observable<T[]> {
    const headers = this.generateHeaders();
    return this.http.get<T[]>(this.apiUrl, { headers });
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(item: T): Observable<T> {
    const headers = this.generateHeaders();
    return this.http.post<T>(this.apiUrl, item, { headers });
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: string): Observable<T> {
    const headers = this.generateHeaders();

    const httpOptions = {
      headers: headers,
      params: { id },
    };

    return this.http.delete<T>(`${this.apiUrl}`, httpOptions);
  }
}
