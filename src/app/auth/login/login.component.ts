import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  constructor( public authService: AuthService,
               public store: Store<AppState> ) { }

  ngOnInit() {
    // Suscripcion a un cambio en particular de ui
    this.subscription = this.store.select('ui')
                        .subscribe( ui => this.cargando = ui.isLoading ); // cargando va a permitir utilizarlo en
                                                                          // el html del componente
  }

  // Esto permite que se destruya el subscribe cada vez que ingrese a este componente.
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login( data: any ) {

    console.log(data);
    this.authService.loginUsuario( data.email, data.password );

  }
}
