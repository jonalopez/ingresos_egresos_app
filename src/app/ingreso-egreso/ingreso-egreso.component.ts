import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})

// Se agrega ondestroy para cancelar la subscripcion
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso'; // Recordar que cuando es un valor por defecto debe ser con igual

  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  // ingresoEgresoServive creado en ingreso-egreso.service.ts
  constructor( public ingresoEgresoService: IngresoEgresoService,
               public store: Store<AppState> ) { }

  ngOnInit() {

    this.loadingSubs =  this.store.select('ui')
        .subscribe( ui => this.cargando = ui.isLoading );

    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl( 0, Validators.min(0) )
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {

    this.store.dispatch( new ActivarLoadingAction() );

    // utilizar los elementos para fusionarlos en un unico objeto utilizando el modelo.
   const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo : this.tipo });
   console.log( ingresoEgreso );
   this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
         .then( () => {
          this.store.dispatch( new DesactivarLoadingAction() );
          swal('Creado', ingresoEgreso.descripcion, 'success');
          // Reinicia el formulario despues de crear el registro en firebase.
          this.forma.reset({  monto: 0  }); // Monto por defecto en cero, al terminar la grabacion.
      });
    }
}
