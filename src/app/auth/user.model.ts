
// Se crea este modelo de usuarios para iniciar el registro de colecciones por usuario.

export class User {

    public nombre: string;
    public email: string;
    public uid: string;


    constructor( nombre: string, email: string, password: string ) {

        this.nombre = nombre;
        this.email = email;
        this.uid = password;

    }
}
