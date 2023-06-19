import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  author = {
    email: '',
    password: '',
  };

  token: any;

  isEmailInvalid: boolean = false;
  isEmailRequired: boolean = false;
  isEmailInvalidFormat: boolean = false;
  isEmailNotFound: boolean = false;
  isPasswordInvalid: boolean = false;
  isPasswordRequired: boolean = false;
  isInvalidCredentials: boolean = false;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void { }

  login() {
    this.isEmailInvalid = false;
    this.isEmailRequired = false;
    this.isEmailInvalidFormat = false;
    this.isEmailNotFound = false;
    this.isPasswordInvalid = false;
    this.isPasswordRequired = false;
    this.isInvalidCredentials = false;

    // Validate the email and password
    if (!this.author.email) {
      this.isEmailInvalid = true;
      this.isEmailRequired = true;
    } else if (!this.validateEmail(this.author.email)) {
      this.isEmailInvalid = true;
      this.isEmailInvalidFormat = true;
    }

    if (!this.author.password) {
      this.isPasswordInvalid = true;
      this.isPasswordRequired = true;
    }

    // Continue with the login logic if the form is valid
    if (!this.isEmailInvalid && !this.isPasswordInvalid) {
      this._auth.login(this.author).subscribe(
        (res: any) => {
          this.token = res;
          localStorage.setItem('token', this.token.token);
          this.router.navigate(['/home']);
        },
        (error) => {
          if (error.status === 401) {
            const errorMessage = error.error.message;
            if (errorMessage === 'Invalid credentials') {
              this.isInvalidCredentials = true;
            } else if (errorMessage === 'Email not found') {
              this.isEmailNotFound = true;
            }
          }
        }
      );
    }
  }

  validateEmail(email: string) {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
