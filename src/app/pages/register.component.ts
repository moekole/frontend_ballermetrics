import { Component } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  providers: [MessageService, ConfirmationService],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router) 
    {}

  register2() {
    console.log("hier")
    console.log('in register');
    const vornamef = document.getElementById('vorname') as HTMLInputElement;
    const nachnamef = document.getElementById('nachname') as HTMLInputElement;
    const emailf = document.getElementById('email') as HTMLInputElement;
    const passwordf = document.getElementById('password') as HTMLInputElement;
    //document.getElementById('password') as HTMLInputElement


    const vorname = vornamef.value;
    const nachname = nachnamef.value;
    const email = emailf.value;
    const password = passwordf.value;

    console.log(vorname, nachname, email, password);

    const url = 'https://ballermetrics-backend2.onrender.com/registration/register';

    console.log(url);

    var user = {
      firstName: vorname,
      lastName: nachname,
      email: email,
      password: password
    }

    console.log(user);

    var init: RequestInit = {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    console.log(init);

    

    fetch(url, init)
    .then(res => {
      if(!res.ok){
        console.log("fetch fehler");
      }
      return res.json();
    }).then(json => {
      localStorage.setItem('jwttoken', JSON.stringify({ token: json.token}));
      console.log(json);

      //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      //var token = currentUser.token; // your token
      console.log(localStorage.getItem('jwttoken'));
      this.router.navigate(['/login']);
    }).catch(err => {
      console.log(err);
      this.messageService.add({ severity: 'error', summary: 'Fehler beim Registieren. Bitte erneut eingeben.', life: 5000 });
    });

    
  }

}
