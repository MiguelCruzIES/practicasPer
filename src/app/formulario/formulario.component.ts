import { Component,  } from '@angular/core';
import { FormGroup, FormControl, FormArray , Validators } from '@angular/forms'
import { Observable } from 'rxjs';
import { promise } from 'protractor';

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
    correo:"miguel.cruz@ies.com",
/*     pasatiempos:["Correr", "Dormir", "Comer"]
 */  }

  constructor() { 
      this.forma=new FormGroup({
        'nombrecompleto': new FormGroup({
          'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
          'apellido': new FormControl('',[ Validators.required,
                                           this.noRepetir ]),
        }),
        'correo': new FormControl('', 
                                  [Validators.required,
                                   Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),      
        'pasatiempos': new FormArray([
          new FormControl('', Validators.required)
        ]),
        'username': new FormControl('', Validators.required,this.existe ),
        'password': new FormControl('', Validators.required),
        'password1': new FormControl()
      })

      this.forma.controls['password1'].setValidators([
        Validators.required, this.noIgual.bind(this.forma)
      ])   

/*       this.forma.setValue(this.usuario);

      //Observador para visualizar los cambios en cierto elemento 
      this.forma.controls['username'].valueChanges.subscribe(data=>{
          console.log(data);
      })
*/
 }

   guardarCambios(){
    console.log(this.forma.value);
  //  this.forma.reset();
 }

 agregarPasatiempo(){
   (<FormArray>this.forma.controls['pasatiempos']).push(
     new FormControl('', Validators.required)
   )
 }

 noRepetir(control: FormControl) : {[s:string]:boolean} {
  if(control.value === "bucio")
{
  return{
    norepetir:true
  }
}
  return null;
 }
 
 noIgual(control: FormControl) : {[s:string]:boolean} {
  let forma:any = this;
  if(control.value !== forma.controls['password'].value )
{
  return{
    noiguales:true
  }
}
  return null;
 }
 
 existe(control: FormControl): Promise<any> | Observable<any> {
    let promesa = new Promise(
      (resolve, rejet)=>{
        setTimeout(()=>{
          if( control.value === "strider"){
            resolve({existe:true})
          }else{
            resolve(null) 
          }
        },3000)
        
    }
    )
    return promesa;
 }

}




