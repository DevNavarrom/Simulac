export class Preguntas{
    public id_pregunta: number; 
    public id_area:string;
    public id_tema: string;
    public desc_pregunta: string;
    public imagen: string; 
  
    constructor(id_pre: number,id_area:string,desc_pre: string,id:string, img: string){
        this.id_pregunta = id_pre;
        this.id_area = id_area;
        this.id_tema= id;
        this.desc_pregunta = desc_pre;
        this.imagen = img;
    }

}