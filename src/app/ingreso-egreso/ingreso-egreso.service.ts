import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnSetItemsAction } from './ingreso-egreso.action';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListerSubcription: Subscription = new Subscription();
  ingresoEgresoItemsSubcription: Subscription = new Subscription();

  // Para trabajar con Firebase de importa este elemento en el constructor (paso 1)
  constructor( private afBd: AngularFirestore,
               public authService: AuthService,
               private store: Store<AppState> ) { }

    initIngresoEgresoListener() {

    this.ingresoEgresoListerSubcription = this.store.select('auth')
        .pipe(
          filter( auth => auth.user != null )
        )
        .subscribe(auth =>
              this.ingresoEgresoItems(auth.user.uid)
            );

    }

    private ingresoEgresoItems( uid: string ) {

      this.ingresoEgresoItemsSubcription = this.afBd.collection(`${ uid }/ingresos-egresos/items`)
               .snapshotChanges()
               .pipe(
                 map(  docData => {
                  return docData.map( doc => {
                    return {
                      uid: doc.payload.doc.id,
                      ...doc.payload.doc.data()
                    };
                  });
                 })
               )
               .subscribe( (coleccion: any[]) => {
                this.store.dispatch( new SetItemsAction(coleccion) );
               });
    }

    cancelarSubscriptions() {
      this.ingresoEgresoListerSubcription.unsubscribe();
      this.ingresoEgresoItemsSubcription.unsubscribe();

      this.store.dispatch(new UnSetItemsAction() );
    }

  // Se crea un nuevo metodo que recibe un elemento de tipo ingresoEgreso que contiene el modelo. (paso 2), debe llamarse desde la
  // pantalla ingreso egreso y para eso se debe importar el servicio en el ingreso-egreso.component.ts en el constructor.
  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {

    const user = this.authService.getUsuario(); // Traigo la informacion del y la relaciono con la constante user.
    // Envia el dato a UID/ingreso-egreso y se crea nueva coleccion (items) con lo enviado en ...ingresoEgreso (modelo)
    return this.afBd.doc(`${ user.uid }/ingresos-egresos`)
        .collection('items').add({ ...ingresoEgreso });
  }

  borrarIngresoEgreso( uid: string ) {

    const user = this.authService.getUsuario();

    return this.afBd.doc(`${ user.uid }/ingresos-egresos/items/${ uid }`)
               .delete();

  }
}
