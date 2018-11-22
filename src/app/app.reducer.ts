
// Archivo global con toda la definicion del estado, este es el paso 3 despues de haber creado el action del
// componenete y el reducer del componente

// Despues de crear cualquier reducer se debe utiilizar aqui

// Se importa todo lo referente a la interfaz de usuario
import * as fromUI from './shared/ui.reducer'; // Se necesita el reducer
import * as fromAuth from './auth/auth.reducer'; // Se necesita el reducer
import { ActionReducerMap } from '@ngrx/store'; // Permite fusionar varios reducer en uno solo, para que la aplicacion
                                                // conozca como estan trabajando cada una de las partes que va a tener el store

// Se exporta el estado completo de la aplicacion
export interface AppState {
     ui: fromUI.State; // Este esta relacionado con el ui.reducer que contiene el isloading
     user: fromAuth.AuthState; // Este esta relacionado con el auth.reducer de la carpeta auth
}

// Configuracion global de los reducer
// ActionReducerMap es de tipo AppState y con eso se le dice a la aplicacion que va a tener esta forma
// Es igual (=) porque esta dentro de un objeto
export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    user: fromAuth.authReducer // Aqui va el reducer
};
