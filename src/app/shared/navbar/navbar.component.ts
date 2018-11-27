import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  nombre: string;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {

    this.store.select('auth')
        .pipe(
          filter( auth => auth.user != null )
        )
        .subscribe(auth =>
              this.nombre = auth.user.nombre
            );
  }

}
