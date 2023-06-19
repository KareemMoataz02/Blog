import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private router: Router) { }


  canActivate(): boolean {
    if (this._auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }

}