import { Component } from '@angular/core';
import { BallerserviceService } from '../auth/ballerservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {

  constructor(private authservice: BallerserviceService){};

  login()
  {
    const emailf = document.getElementById('email') as HTMLInputElement;
    const passwordf = document.getElementById('password') as HTMLInputElement;

    const email = emailf.value;
    const password = passwordf.value;

    console.log(email , password);

    this.authservice.login(email, password);
  }

}
