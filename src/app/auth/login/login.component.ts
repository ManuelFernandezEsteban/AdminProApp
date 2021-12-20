import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: []
})
export class LoginComponent implements OnInit {

  public auth2:any;

  public formSubmitted: boolean = false;

  public loginForm = this.fb.group({

    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [true]

  })
  

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone:NgZone) { }

  ngOnInit(): void {
    this.renderButton()
  }
  login() {

    this.usuarioService.login(this.loginForm.value).subscribe(resp => {
      if (this.loginForm.get('remember')?.value) {
        localStorage.setItem('email', this.loginForm.get('email')?.value);
      } else {
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error')
    })

  }

  //

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2=this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }
  

  attachSignin(element:any) {
    
    this.auth2.attachClickHandler(element, {},
        (googleUser:any) => {
          const token_id = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle(token_id).subscribe(resp=>{
            this.ngZone.run(()=>{
              this.router.navigateByUrl('/');
            })
            
          });
          
        }, function(error:any) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
