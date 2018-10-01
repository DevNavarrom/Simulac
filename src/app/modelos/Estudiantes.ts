
export class Estudiantes{
    public idest: string; 
    public nombre: string; 
    public grupo: string; 
    public sexo: string;
    constructor(ides: string, nombre: string, grupo: string, sexo: string){
        this.idest = ides;
        this.nombre = nombre;
        this.grupo = grupo;
        this.sexo = sexo;
    }

}