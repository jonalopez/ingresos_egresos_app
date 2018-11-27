// Acciones que va a hacer la aplicacion asociadsa a la interfaz de usuario
// Este auth.action se crea para saber quien es el usuario autenticado en ese momento y ocupara otro nodo.

import { Action } from '@ngrx/store';
import { User } from './user.model';

export const SET_USER = '[Auth] Set User';
export const UNSET_USER = '[Auth] UnSet User';

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor( public user: User) {}
}

export class UnSetUserAction implements Action {
    readonly type = UNSET_USER;
}

export type acciones = SetUserAction | UnSetUserAction;
