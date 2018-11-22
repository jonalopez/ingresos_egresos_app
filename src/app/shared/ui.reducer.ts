
// Necesita las acciones y deben ser importadas.
import * as fromUI from './ui.actions';

export interface State {
    isLoading: boolean;
}

// Inicializar el valor, he implementa la interfaz de State declarada arriba
const initState: State = {
    isLoading: false
};

// Se reciben dos elementos, el estado inicial(con igual) y las acciones(con dos puntos) y siempre va a regresar algo del tipo State
export function uiReducer( state = initState, action: fromUI.acciones ): State {

    // Siempre poner el default
    switch ( action.type ) {
        // Si es activar loading entra por aqui.
        case fromUI.ACTIVAR_LOADING:
            return{
                isLoading: true
            };
        // Si es activar loading entra por aqui.
        case fromUI.DESACTIVAR_LOADING:
            return{
                isLoading: false
            };

        default:
        return state;
    }

}

