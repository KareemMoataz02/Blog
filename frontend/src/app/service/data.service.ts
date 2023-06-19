import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/article/';
  urlAuthor = 'http://localhost:3000/author/';

  createArticle(article: any) {
    return this.http.post(this.url + 'add', article)

  }

  getAll() {
    return this.http.get(this.url + 'all');
  }

  getArticleByIdAuthor(id: any) {
    return this.http.get(this.url + 'getbyidauthor/' + id);
  }

  getArticleById(id: any) {
    return this.http.get(this.url + 'getbyid/' + id);
  }

  getAuthorFullName(id: any): Observable<{ name: string, lastname: string }> {
    const url = `${this.urlAuthor}/getFullName/${id}`;
    return this.http.get<{ name: string, lastname: string }>(url);
  }
}