import { Temas } from "./Temas";

export class Examen extends Temas{
    public id_examen: string; 
    public desc_examen: string; 
    
    constructor(tema: Temas,id: string, desc: string){

        super(tema.id_area,tema.desc_area,tema.id_tema,tema.desc_tema);
        this.id_examen = id;
        this.desc_examen = desc;
     
    }

   

}