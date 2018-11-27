
// PASO 1 AL CREAR REDUCER crear el modelo de lo que se va a procesar
// Se crea este modelo de usuarios para iniciar el registro de colecciones por usuario.

export class IngresoEgreso {

    public descripcion: string;
    public monto: string;
    public tipo: string;
    public uid?: string;


    constructor( obj ) {

        // Si existe el objeto entonces toma la posicion declara en la interfaz, sino null.
        this.descripcion = obj && obj.descripcion || null;
        this.monto = obj && obj.monto || null;
        this.tipo = obj && obj.tipo || null;
       // this.uid = obj && obj.uid || null;

    }
}


