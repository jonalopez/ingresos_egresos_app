import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
               private router: Router,
               private afBd: AngularFirestore ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( fbUser => {
      console.log(fbUser);
    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {

    this.afAuth.auth
      .createUserWithEmailAndPassword( email, password )
      .then( resp => {

        const user: User = {

          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email

        };

        this.afBd.doc(`${ user.uid }/usuario`)
        .set( user )
        .then( () => {
          this.router.navigate(['/']); // Si todo lo ahce correcto navego hacia el dashboard
        });

      } )
      .catch( error => {
        console.error( error );
        swal('Error en el login', error.message, 'error');
      } );

  }

  loginUsuario( email: string, password: string ) {

    this.afAuth.auth
      .signInWithEmailAndPassword( email, password )
      .then( resp => {
        console.log( resp );
        this.router.navigate(['/']);
      } )
      .catch( error => {
        console.error( error );
        swal('Error en el login', error.message, 'error');
      } );

  }

  logout() {

    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  // Controla si el usuario esta logueado
  isAuth() {
    return this.afAuth.authState.pipe(
          map( fbUser => {

            if ( fbUser === null ) {
              this.router.navigate(['/login']);
            }

            return fbUser != null;
          } )
    );
  }

}
