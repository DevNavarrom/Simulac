export class Respuestas{
    public id_respuesta: string; 
    public desc_respuesta: string;
    public correcta: boolean;
  
    constructor(id: string,desc: string,correcta:boolean){
        this.id_respuesta = id;
        this.desc_respuesta= desc;
        this.correcta = correcta;
    }

}

export interface IRespuestas { 
    id_pregunta: number; 
    id_respuesta: string;
    desc_respuesta: string;
    correcta: number;
}