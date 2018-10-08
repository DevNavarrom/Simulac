import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios, ILogin } from '../../modelos/Usuarios';
import { UsuariosService } from '../../services/usuarios.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import { RegistroComponent } from '../login/registro/registro.component';
import { Estudiantes } from '../../modelos/Estudiantes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginEstudiante: FormGroup;

  login:boolean = true;
  _usuario:Usuarios = null;
  usuarioLogueado:Usuarios;
  estudiante:Estudiantes;

  constructor( private fb: FormBuilder, title: Title, private _router:Router, 
    private _usuariosService:UsuariosService, public dialog: MatDialog ) { 
    title.setTitle('Login Angular 5');
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.compose([Validators.required]) ],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)]) ],
    });
    this.loginEstudiante = this.fb.group({
      idEstudiante: ['', Validators.compose([Validators.required]) ]
    });
  }

  submit() {
    const usuario = this.loginForm.value.usuario;
    const password = this.loginForm.value.password;

    this._usuario = new Usuarios("","","",usuario, password);
    
    this._usuariosService.login(this._usuario).subscribe((res) => {
      this.usuarioLogueado = res['datos'] ;
      
      if (this.usuarioLogueado[0] != null) {
        if (this.usuarioLogueado[0].user == this._usuario.user && this.usuarioLogueado[0].password == this._usuario.password) {
          //alert("¡Bienvemid0!");
          this.login = false;
          this._router.navigate(['/home']);
          //this._router.navigate(['/inicio', "1067917149"]);
          
        } else {
          alert("Usuari0 0 c0ntraseña inc0reccta");
        }
      }
      
      
    }
    );
    
}

registrarNuevo(){
  const idEstudiante = this.loginEstudiante.value.idEstudiante;
  this.estudiante = new Estudiantes(idEstudiante, "","","");
  
  const dialogRef = this.dialog.open(RegistroComponent, {
    panelClass: 'my-panel',
    width: '450px',
    data: this.estudiante
  });

  dialogRef.afterClosed().subscribe(result => {

    if ( !result ) {
     
      return;
    }
    this.estudiante = new Estudiantes(result.idEstudiante, result.nombre,result.programa,result.sexo);
    console.log(this.estudiante.nombre);
    /*let ar: Areas;
    ar= new Areas(result.id_area,result.desc_area);
         ar.desc_area=ar.desc_area.toUpperCase();

    this._areasService.editarArea(ar).subscribe(datos => {
      if (datos['estado'] == 1) {
        alert(datos['mensaje']);
        this.mostrarTodas();
      } else {
        alert('No editada');
      }

    });*/
    
    });
}

}
