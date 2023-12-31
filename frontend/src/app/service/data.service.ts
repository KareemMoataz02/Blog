import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // url = 'http://localhost:10000/article/';
  // urlAuthor = 'http://localhost:10000/author/';
  // urlNodeMailer = 'http://localhost:10000/newsletter/';

  url = 'https://blog-backend-service.onrender.com/article/';
  urlAuthor = 'https://blog-backend-service.onrender.com/author/';
  urlNodeMailer = 'https://blog-backend-service.onrender.com/newsletter/';

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

  newsLetter(email: any) {
    const payload = { email: email };
    return this.http.post(this.urlNodeMailer + 'subscribe', payload);
  }
}