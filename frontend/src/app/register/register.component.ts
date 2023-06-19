import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  author = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    about: '',
  }

  image: any;

  authorForm!: FormGroup;
  isEmailExists: boolean = false;

  constructor(private _auth: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.authorForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      image: [''],
      about: ['', Validators.maxLength(200)]
    });
  }

  select(e: any) {
    this.image = e.target.files[0];
  }

  register() {
    if (this.authorForm.invalid) {
      return;
    }

    const fd = new FormData();
    fd.append('name', this.authorForm.value.name);
    fd.append('lastname', this.authorForm.value.lastname);
    fd.append('email', this.authorForm.value.email);
    fd.append('password', this.authorForm.value.password);
    fd.append('about', this.authorForm.value.about);
    fd.append('image', this.image);

    this._auth.register(fd).subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      error => {
        if (error.status === 409) {
          this.isEmailExists = true;
        }
      }
    );
  }
}
