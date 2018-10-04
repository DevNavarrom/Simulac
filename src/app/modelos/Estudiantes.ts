
export class Estudiantes{
    public id_estudiante: string; 
    public nombre: string; 
    public programa: string; 
    public sexo: string;
    constructor(ides: string, nombre: string, programa: string, sexo: string){
        this.id_estudiante = ides;
        this.nombre = nombre;
        this.programa = programa;
        this.sexo = sexo;
    }

}