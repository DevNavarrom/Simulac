import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Estudiantes } from 'src/app/modelos/Estudiantes';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { StorageService } from 'src/app/services/storage.service';
import { StorageServiceE } from 'src/app/services/storageE.service';
import { SessionE } from 'src/app/modelos/SessionE';
import { Router } from '@angular/router';
import { Usuarios } from '../../../modelos/Usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Session } from 'src/app/modelos/Session';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: []
})
export class RegistroComponent implements OnInit {
  forma: FormGroup;
  doc=false;
 
  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<RegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _estudiantesService:EstudiantesService,
    private _router:Router,private _usuariosService:UsuariosService,
    private storageService: StorageService,private storageServiceE: StorageServiceE)
     {
       
      this.forma = fb.group({
        'id' : '',
        'nombres': '',
        'user': '',
        'password': '',
        'rol':'',
        'clave_registro':''
      });
      


     }

  ngOnInit() {
  }

  cambiarRol()
  {
    if(this.forma.value.rol=='D')
    {
      this.doc=true;
    }
    else{
      this.doc=false;
    }
    
  }

  generarTocken() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
  registrar() {
    if (this.forma.value.id != '' && this.forma.value.nombres != ''&& this.forma.value.password != '' && this.forma.value.usuario !='') {
      if (this.forma.value.rol !== '') {

   
    let result=this.forma.value;

    if(result.rol=="E")
    {
      this.registrarEstudiante(result);
      
    }
    else{
      this.registrarDocente(result)
    }
    



  }  else {
    alert('Seleccione el rol');
  }
  } else {
    alert('Faltan datos por llenar');
  }
  }

  registrarEstudiante(result)
  {
    let estu: Estudiantes;
    estu= new Estudiantes(result.id,result.nombres,result.user,result.password);
    estu.nombre=estu.nombre.toUpperCase();
    this._estudiantesService.postEstudiantes(estu).subscribe(datos => {
     
      if (datos["mensaje"][0].resultado == "USUARIO REGISTRADO") {
        
        let data: SessionE=new SessionE();
        data.token=this.generarTocken();
        delete(estu.password);
        data.user=estu;
        this.storageServiceE.setCurrentSession(data);
        this.dialogRef.close(this.forma.value);
        this._router.navigate(['/home']);
        
      } else {
        if(datos['estado'] == 23000)
        {
          alert('El ID ya se encuentra registrado');

        }else{

        alert(datos["mensaje"][0].resultado);
 
        }
     
      }

    });


  }

  registrarDocente(result)
  {
  
    let docente={
      id_usuario:result.id,
      nombres:result.nombres,
      user:result.user,
      password:result.password,
      clave_registro:result.clave_registro
    }

    //console.log(docente);

    this._usuariosService.postDocente(docente).subscribe(datos => {
     
      if (datos["mensaje"][0].resultado == "USUARIO REGISTRADO") {
        
        let data: Session=new Session();
        data.token=this.generarTocken();
        delete(docente.password);
        data.user=new Usuarios(docente.id_usuario,docente.nombres,docente.user,docente.password);
        this.storageService.setCurrentSession(data);
        this.dialogRef.close(this.forma.value);
        this._router.navigate(['/home']);
        
      } else {
        if(datos['estado'] == 23000)
        {
          alert('El ID ya se encuentra registrado');

        }else{

        alert(datos["mensaje"][0].resultado);
 
        }
     
      }

    });


  }
 
  onNoClick(): void {
    this.dialogRef.close();
    
  }

}
