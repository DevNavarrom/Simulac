export class Temas{
    public id_area: string; 
    public id_tema: string;
    public desc_area: string;
    public desc_tema: string; 
  
    constructor(id_area: string,desc_area: string,id:string, desc: string){
        this.id_area = id_area;
        this.id_tema= id;
        this.desc_tema = desc;
   
    }

}