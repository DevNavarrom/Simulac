import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  login:boolean = true;
  constructor( private fb: FormBuilder, title: Title, private _router:Router ) { 
    title.setTitle('Login Angular 5');
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email]) ],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)]) ],
    });
  }

  submit() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    if (email == "deimer@gmai" && password=="123456") {
      //alert("¡Bienvemid0!");
      this.login = false;
      this._router.navigate(['/home']);
      //this._router.navigate(['/inicio', "1067917149"]);
      
    } else {
      alert("Usuari0 0 c0ntraseña inc0reccta");
    }
}

}
