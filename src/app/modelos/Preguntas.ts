import { Respuestas } from "./Respuestas";

export class Preguntas{
    public id_pregunta: number; 
    public id_tema: string;
    public desc_pregunta: string;
    public imagen: string; 
    public respuestas: Respuestas[];

  
    constructor(idpregunta: number,desc_pregunta: string,id_tema:string, img: string,respuestas: Respuestas[]){
        this.id_pregunta = idpregunta;
        this.id_tema= id_tema;
        this.desc_pregunta = desc_pregunta;
        this.imagen = img;
        this.respuestas=respuestas;

    }

}

export interface DialogDataPreguntas {
    id_pregunta: number;
    desc_pregunta: string;
    id_area: string;
    id_tema: string;
    imagen: string;
  }