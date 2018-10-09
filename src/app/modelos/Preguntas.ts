import { Respuestas } from "./Respuestas";

export class Preguntas{
    public id_pregunta: number; 
    public id_tema: string;
    public desc_pregunta: string;
    public imagen: string; 
    public respuestas: Respuestas[];
  
    constructor(id_area: number,desc_area: string,id:string, img: string,respuestas: Respuestas[]){
        this.id_pregunta = id_area;
        this.id_tema= id;
        this.desc_pregunta = desc_area;
        this.imagen = img;
        this.respuestas=respuestas;
    }

}