import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editarexamen',
  templateUrl: './editarexamen.component.html'
})
export class EditarexamenComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute) {
      this._activatedRoute.params.subscribe( params => {
        console.log(params['id']);
      });
   }

  ngOnInit() {
  }

}
