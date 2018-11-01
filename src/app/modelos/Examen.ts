import { Temas } from "./Temas";

export class Examen extends Temas{
    public id_examen: string; 
    public desc_examen: string; 
    public id_tema:string;
    
    constructor(tema: Temas,id: string, desc: string){

        super(tema.id_area,tema.desc_area,tema.id_tema,tema.desc_tema);
        this.id_examen = id;
        this.desc_examen = desc;
    }

   

}

export interface IExamen {
    desc_examen: string; 
    id_tema:string;
    id_area:string;
    id_examen:number;
    desc_tema:string;
    desc_area:string;
}

export interface IDetalleExamen {
    id_examen : number;
    id_pregunta : number;
}

export interface IExamenes {
    id:string;
    desc_examen:string;
    desc_area:string;
    desc_tema:string;
    cantidad:number;
}