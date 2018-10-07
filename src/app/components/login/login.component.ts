import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios, ILogin } from '../../modelos/Usuarios';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  login:boolean = true;
  _usuario:Usuarios = null;
  usuarioLogueado;

  constructor( private fb: FormBuilder, title: Title, private _router:Router, private _usuariosService:UsuariosService ) { 
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
  }

  submit() {
    console.log("Submit ejecutado");
    const usuario = this.loginForm.value.usuario;
    const password = this.loginForm.value.password;

    this._usuario = new Usuarios("","","",usuario, password);
    
    this._usuariosService.login(this._usuario).subscribe((res) => {
      this.usuarioLogueado = res['datos']}
    );
  
    if (this.usuarioLogueado != null) {
      //alert("¡Bienvemid0!");
      this.login = false;
      this._router.navigate(['/home']);
      //this._router.navigate(['/inicio', "1067917149"]);
      
    } else {
      alert("Usuari0 0 c0ntraseña inc0reccta");
    }
}

}
