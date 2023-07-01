import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000/author/';

  // private url = 'https://blog-backend-service.onrender.com/author/';


  register(author: any) {
    return this.http.post(this.url + 'register', author)

  }

  login(author: any) {
    return this.http.post(this.url + 'login', author)
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    else {
      return false;
    }
  }

  getDataFromToken() {
    let token = localStorage.getItem('token');
    if (token) {
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }
    else {
      return null;
    }
  }

  getById(id: any) {
    return this.http.get(this.url + 'getbyid/' + id);
  }

}
