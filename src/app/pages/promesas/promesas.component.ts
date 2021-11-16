import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios=>{
      console.log(usuarios);
    });
    /*const promesa=new Promise((resolve,reject)=>{
      if(false){
        resolve('Hola mundo');
      }else{
        reject('Algo salió mal')
      }
      
    });

    promesa.then((mensaje)=>{
      console.log('listo '+mensaje);
    })
    .catch(error=>{
      console.log('Error ' + error)
    })

    console.log('Fin init');*/
  }

  getUsuarios(){

    const promesa = new Promise(resolve=>{
      fetch('https://reqres.in/api/users?page=2')
        .then(resp=> resp.json())
        .then(body=>console.log(body.data));
    });     
    return promesa;        
    
  }
}
