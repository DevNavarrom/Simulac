import {Areas} from './Areas';
export class Temas extends Areas{

    public id_tema: string;
    public desc_tema: string; 
  
    constructor(id_area: string,desc_area: string,id:string, desc: string){

        super(id_area,desc_area);
        this.id_tema= id;
        this.desc_tema = desc;
   
    }

   

}