
export class Estudiantes{
    public id_estudiante: string; 
    public nombre: string; 
    public user: string; 
    public password: string;
    constructor(ides: string, nombre: string, user: string, password: string){
        this.id_estudiante = ides;
        this.nombre = nombre;
        this.user = user;
        this.password = password;
    }

}