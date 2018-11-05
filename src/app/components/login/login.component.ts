import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios, ILogin } from '../../modelos/Usuarios';
import { UsuariosService } from '../../services/usuarios.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import { RegistroComponent } from '../login/registro/registro.component';
import { Estudiantes } from '../../modelos/Estudiantes';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Session } from 'src/app/modelos/Session';
import { StorageService } from 'src/app/services/storage.service';
import { StorageServiceE } from 'src/app/services/storageE.service';
import { SessionE } from 'src/app/modelos/SessionE';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  estudiantesForm: FormGroup;
  _usuario:Usuarios = null;
  usuarioLogueado:Usuarios;
  estudiante:Estudiantes;

  constructor( private fb: FormBuilder, title: Title, private _router:Router, 
    private _usuariosService:UsuariosService,private _estudiantesService:EstudiantesService,
    private storageService: StorageService,private storageServiceE: StorageServiceE,
     public dialog: MatDialog ) { 
    title.setTitle('Login Web Simulac');
    this.buildForm();
   
  }

  ngOnInit() {
  
  }

  buildForm() {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.compose([Validators.required]) ],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)]) ],
    });
   
    this.estudiantesForm = this.fb.group({
      idEstudiante: ['', Validators.compose([Validators.required]) ]
    });

    
  }

  submit() {
    const usuario = this.loginForm.value.usuario;
    const password = this.loginForm.value.password;

    this._usuario = new Usuarios("","","",usuario, password);
    
    this._usuariosService.login(this._usuario).subscribe((res) => {
      this.usuarioLogueado = res['datos'] ;
        if (this.usuarioLogueado[0] != null && this.usuarioLogueado[0].user == this._usuario.user && this.usuarioLogueado[0].password == this._usuario.password) {

          let data: Session=new Session();
          data.token=this.generarTocken();
          data.user=this.usuarioLogueado[0].user;
          this.storageService.setCurrentSession(data);
          this._router.navigate(['/home']);
          
        } else {
          alert("Usuario o contraseña incoreccta");
        }     
      
    }
    );
    
}
 generarTocken() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}



ingresoEstudiante()
{
  
  if(this.estudiantesForm.value.idEstudiante != ''){
  this._estudiantesService.getEstudiante(this.estudiantesForm.value.idEstudiante).subscribe((res) => {
    this.estudiante = res['datos'][0] ;
    console.log(res['datos'][0]);
    if(this.estudiante!=null){
      let data: SessionE=new SessionE();
      data.token=this.generarTocken();
      data.user=this.estudiante;
      this.storageServiceE.setCurrentSession(data);
      this._router.navigate(['/home']);
    }
    else{
      alert("El estudiante no se encuentra registrado, por favor registrese");
      this.registrarNuevo();
    }
      
    
  }
  );
}
else
{
  alert("Ingrese su identificación");
}
}
registrarNuevo(){
  
  this.estudiante = new Estudiantes(this.estudiantesForm.value.idEstudiante , "","","");
  
  const dialogRef = this.dialog.open(RegistroComponent, {
    panelClass: 'my-panel',
    width: '350px',
    data: this.estudiante
  });

  dialogRef.afterClosed().subscribe(result => {

    if ( !result ) {
     
      return;
    }

   let estu: Estudiantes;
    estu= new Estudiantes(result.id_estudiante,result.nombre,result.programa,result.sexo);
    estu.nombre=estu.nombre.toUpperCase();
    estu.programa=estu.programa.toUpperCase();
    this._estudiantesService.postEstudiantes(estu).subscribe(datos => {
      if (datos['estado'] == 1) {
        
        alert(datos['mensaje']);
        this.estudiante=estu;
   
        this._router.navigate(['/home']);
        
      } else {
        alert('No registrado');
      }

    });
    
    });
}

}
