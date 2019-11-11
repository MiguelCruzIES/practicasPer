import { Component,  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
 
  forma: FormGroup;
  usuario:any={
    nombrecompleto:{
      nombre:'Miguel',
      apellido:'Bucio'
    },
    correo:"miguel.cruz@ies.com"
  }

  constructor() { 
      this.forma=new FormGroup({
        'nombrecompleto': new FormGroup({
          'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
          'apellido': new FormControl('', Validators.required),
        }),
        'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]  ),
      })

      this.forma.setValue(this.usuario);
      console.log(this.usuario);

   }
   guardarCambios(){
    this.forma.reset();
    console.log(this.forma.value);
 }
 
}

