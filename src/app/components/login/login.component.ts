import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios, ILogin } from '../../modelos/Usuarios';
import { UsuariosService } from '../../services/usuarios.service';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
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
  estLogueado:Estudiantes;
  estudiante:Estudiantes;

  constructor( private fb: FormBuilder, title: Title, private _router:Router, 
    private _usuariosService:UsuariosService,private _estudiantesService:EstudiantesService,
    public snackBar: MatSnackBar,
    private storageService: StorageService,private storageServiceE: StorageServiceE,
     public dialog: MatDialog ) { 
    title.setTitle('Login Web Simulac');
    this.buildForm();
   // window.location.reload();

   
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
  generarTocken() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  submit() {
    
    const usuario = this.loginForm.value.usuario;
    const password = this.loginForm.value.password;

    if (usuario != "" && password != "") {
      
      this._usuario = new Usuarios("","",usuario, password);
    
    this._usuariosService.login(this._usuario).subscribe((res) => {

      if(res['estado']==200)
      {
        if(res['usuario'].rol=="ESTUDIANTE")
        {
          let data: SessionE=new SessionE();
          data.token=this.generarTocken();
          this.estLogueado = res['usuario'] ;
          delete(this.estLogueado.password);
          data.user=this.estLogueado;
          this.storageServiceE.setCurrentSession(data);
          this._router.navigate(['/home']);
        }
        else{
           
        let data: Session=new Session();
        data.token=this.generarTocken();
        this.usuarioLogueado = res['usuario'] ;
        delete(this.usuarioLogueado.password);
        data.user=this.usuarioLogueado;
        this.storageService.setCurrentSession(data);
        this._router.navigate(['/home']);
        }

     
      } else {
        this.openSnackBar(res['mensaje']);
      }   
           
    }
    );
    }else{
      this.buildForm();
    }
    
    
}
 



openSnackBar(message: string) {
  this.snackBar.open(message, 'Aceptar', {
    duration: 2000,
  });
}

registrarNuevo(){
  
  //this.estudiante = new Estudiantes(this.estudiantesForm.value.idEstudiante , "","","");
  
  const dialogRef = this.dialog.open(RegistroComponent, {
    panelClass: 'my-panel',
    width: '350px',
    data: null
  });

  dialogRef.afterClosed().subscribe(result => {

    if ( !result ) {
     
      return;
    }

   
    
    });
}

}
