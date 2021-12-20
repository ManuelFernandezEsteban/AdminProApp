import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, tap } from "rxjs/operators";
import { map, Observable, of } from 'rxjs';



const base_url =environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any;
  constructor(private http:HttpClient) { 
    this.googleInit();
  }

  googleInit(){
    return new Promise<void>(resolve=>{
      gapi.load('auth2',  () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '963830950272-ohpqng4ia9serdahdbb1k806moqlac7q.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',        
        });  
        resolve();    
      });
      
    })
    
  }

  logOut(){
    localStorage.removeItem('token');
    this.auth2.signOut().then(()=>{
      console.log('logOut');
    })
  }


  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token')||'';

    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token)
      }),
      map(resp=>{
        return true;
      }),catchError((error: any)=>of(false))
    )

  }

  crearUsuario(formData:RegisterForm){

    return this.http.post(`${base_url}/usuarios`,formData).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token)
      })
    )

  }
  login(formData:LoginForm){

    return this.http.post(`${base_url}/login`,formData).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token)
      })
    )

  }

  loginGoogle(token:string){

    return this.http.post(`${base_url}/login/google`,{token}).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token)
      })
    )

  }
}
