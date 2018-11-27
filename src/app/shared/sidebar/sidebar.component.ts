import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  nombre: string;

  // Para usar servicios se importan aqui
  constructor( public authService: AuthService,
               private store: Store<AppState>,
               public ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {

    this.store.select('auth')
        .pipe(
          filter( auth => auth.user != null )
        )
        .subscribe(auth =>
              this.nombre = auth.user.nombre
            );
  }

  logout() {
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubscriptions();
  }

}
