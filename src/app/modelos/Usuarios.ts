
export class Usuarios {
    public id_usuario:string;
    public nombres:string;
    public rol:string;
    public user:string;
    public password:string;

    constructor(id:string, nom:string, rol:string, user:string, pass:string){
        this.id_usuario = id;
        this.nombres = nom;
        this.rol = rol;
        this.user = user;
        this.password = pass;
    }

}

export interface ILogin {
    user:string;
    password:string;
}
