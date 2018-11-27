
import * as fromIngresoEgreso from './ingreso-egreso.action';
import { IngresoEgreso } from './ingreso-egreso.model';

// Aqui tiene que ir la palabra State
export interface IngresoEgresoState {
    items: IngresoEgreso[]; // Es una arreglo de ingreso y egreso, una gran coleccion de items
}

// IngresoEgresoState esta declarado encima de esta linea y debe ser llamado aqui.
const estadoInicial: IngresoEgresoState = {
    items: [] // Se declara un arreglo por defecto vacio.
};

// Cuando esto esta terminado se llama en app.reducer.ts
export function ingresoEgresoReducer( state = estadoInicial, action: fromIngresoEgreso.acciones ): IngresoEgresoState {
     // Siempre poner el default
     switch ( action.type ) {
        // Si es activar loading entra por aqui.
        case fromIngresoEgreso.SET_ITEMS:
            return{
                // tslint:disable-next-line:max-line-length
                items: [
                        ... action.items.map( item => {
                            return {
                                ...item
                            };
                        })
                    ]
            };

        case fromIngresoEgreso.UNSET_ITEMS:
            return{
                items: []
            };

        default:
        return state;
    }
}
