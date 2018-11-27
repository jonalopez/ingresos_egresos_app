import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor( private store: Store<AppState>,
               public ingresoEgresoservice: IngresoEgresoService) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.subscription = this.store.select('ingresoEgreso') // Subscription se crea para que al momento de destruir (cambiar) esta pagina este elemento ya no exista
        .subscribe( ingresoEgreso => {
      this.items = ingresoEgreso.items;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem( item: IngresoEgreso ) {
    this.ingresoEgresoservice.borrarIngresoEgreso( item.uid )
    .then( () => {
      Swal('Eliminado', item.descripcion, 'success');
    });
  }
}
