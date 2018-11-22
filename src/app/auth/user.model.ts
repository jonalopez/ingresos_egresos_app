
// Se crea este modelo de usuarios para iniciar el registro de colecciones por usuario.

export class User {

    public nombre: string;
    public email: string;
    public uid: string;


    constructor( obj: DataObj ) {
        // Si existe el objeto entonces toma la posicion declara en la interfaz, sino null.
        this.nombre = obj && obj.nombre || null;
        this.email = obj && obj.email || null;
        this.uid = obj && obj.uid || null;

    }
}

interface DataObj {
    uid: string;
    email: string;
    nombre: string;
}