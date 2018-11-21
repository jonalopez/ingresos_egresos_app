import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( public auhtService: AuthService ) {  }

  canActivate() {

    return this.auhtService.isAuth();
  }
}
