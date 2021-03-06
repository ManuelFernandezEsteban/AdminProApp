import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css'],
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted:boolean=false;

  public registerForm=this.fb.group({
    nombre:['Manuel',[Validators.required,Validators.minLength(3)]],
    email:['lolo3f@gmail.com',[Validators.required,Validators.email]],
    password:['123456',[Validators.required,Validators.minLength(6)]],
    password2:['123456',[Validators.required,Validators.minLength(6)]],
    terminos:[true,Validators.required]
  },{
    validators:this.passwordsIguales('password','password2')
  })

  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private router:Router) { }

  crearUsuario(){
    this.formSubmitted=true;    
    if (this.registerForm.invalid || this.registerForm.get('terminos')?.value===false){
      return;
    }
    //realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(resp=>{
     
      this.router.navigateByUrl('/');
    },(err)=>{
      Swal.fire('Error',err.error.msg,'error')
    });
  }
  ngOnInit(): void {
  }

  campoNoValido(campo:string):boolean{
    
    if (!this.registerForm.get(campo)?.valid && this.formSubmitted){
      return true;
    }
    return false

  }

  terminosAceptados(){  

    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passwordsValidos(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1!==pass2 && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  passwordsIguales(pass1:string,pass2:string){
    return (formGroup:FormGroup)=>{
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control?.value===pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsIgual:true})
      }

    }
  }

}
