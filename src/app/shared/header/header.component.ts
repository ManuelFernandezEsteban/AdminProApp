import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioService:UsuarioService,
              private router:Router,
              private ngZone:NgZone) { }

  logOut(){
    this.usuarioService.logOut();
    this.ngZone.run(()=>{
      this.router.navigateByUrl('/login');
    })
    
  }

  ngOnInit(): void {
  }

}
