
// Necesita las acciones y deben ser importadas desde la miksma raiz
import * as fromAuth from './auth.actions';
import { User } from './user.model';

// Se exporta la accion que quiero implmentar
export interface AuthState {
    user: User; // Aqui se puede declarar de cualquier tipo (boolean, numer, string) o del modelo previamente creado que contiene la 
                // declaracion de todos los campos
}

// Inicializar el valor, he implementa la interfaz de State declarada arriba
const initState: AuthState = {
     user: null // Se declara null por ser un arreglo
};

// Se reciben dos elementos, el estado inicial(con igual) y las acciones(con dos puntos) y siempre va a regresar algo del tipo State
export function authReducer( state = initState, action: fromAuth.acciones ): AuthState {

    // Siempre poner el default
    switch ( action.type ) {
        // Si es activar loading entra por aqui.
        case fromAuth.SET_USER:
            return{
                // tslint:disable-next-line:max-line-length
                user: { ... action.user } // Se devuelve con ... toma cada una de las propiedades del objeto user y se hacen pares de valores y esto devuelve algo de tipo AuthState 
            };

        default:
        return state;
    }

}

