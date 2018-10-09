
import { Examen } from "./Examen";
import { Temas } from "./Temas";
export class Simulacros extends Examen{
    public id_simulacro: string; 
    public fecha: string; 
    public responsable: string; 
    public grupo: string;
    public estado: string;
    constructor(examen: Examen,id: string, fecha: string, responsable: string, grupo: string, estado:string){
       super(new Temas(examen.id_area,examen.desc_area,examen.id_tema,examen.desc_tema),examen.id_examen,examen.desc_examen);
        this.id_simulacro = id;
        this.fecha = fecha;
        this.responsable = responsable;
        this.grupo = grupo;
        this.estado=estado;
    }

}