import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
  private userSubscription: Subscription = new Subscription(); // Se inicializa para que no muestre erorres si no hay subscripciones activas.

  // Para iniciar el uso del store se declara en el constructor el store de tipo Store, el cual debe ser importando de
  // '@ngrx/store' ademas es de tipo AppState el cual debe ser importado de app.reducer
  constructor( private afAuth: AngularFireAuth,
               private router: Router,
               private afBd: AngularFirestore,
               private store: Store<AppState> ) { }

  // Este metodo se llama cuando un usuario se autentica
  initAuthListener() {

    this.afAuth.authState.subscribe( fbUser => {

      if ( fbUser ) {

        // Obtener la referencia a un objeto que se encuentra en firebase
        // tslint:disable-next-line:max-line-length
        this.userSubscription = this.afBd.doc(`${ fbUser.uid }/usuario`).valueChanges() // Con valuechange se escucha cualquier cambio que se tenga, funcion que devuelve un observable
                                        // tslint:disable-next-line:max-line-length
                                        .subscribe( (usuarioObj: any) => { // usuarioObj contiene los 3 datos del usuario que estan firebase email, nombre y uid
                                            const newUser = new User( usuarioObj );
                                            // Una vez se autentique el usuario lo va a almacenar en el store
                                            this.store.dispatch( new SetUserAction( newUser ));
                                            console.log(newUser);
                                        } );
      } else {
          this.userSubscription.unsubscribe();
      }

      console.log(fbUser);
    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {

    // Luego de importar los elementos declarados en el constructor se agrega el dispatch
    this.store.dispatch( new ActivarLoadingAction() ); // Se puede crear una variable accion y luego pasarla al distpach

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
          this.store.dispatch( new DesactivarLoadingAction() );
        });

      } )
      .catch( error => {
        console.error( error );
        this.store.dispatch( new DesactivarLoadingAction() );
        swal('Error en el login', error.message, 'error');
      } );

  }

  loginUsuario( email: string, password: string ) {

    this.store.dispatch( new ActivarLoadingAction() ); // Se puede crear una variable accion y luego pasarla al distpach

    this.afAuth.auth
      .signInWithEmailAndPassword( email, password )
      .then( resp => {
        console.log( resp );
        this.store.dispatch( new DesactivarLoadingAction() );
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
