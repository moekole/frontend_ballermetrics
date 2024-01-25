import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BallerserviceService {
  private accessToken: string | null = null;
  private refreshTokenv: string | null = null;

  constructor(private router: Router) { }
  
  login(email: string, password: string): Observable<void> {
    // Make login request, obtain tokens, and save them
    const url = 'https://ballermetrics-backend2.onrender.com/registration/authenticate';

    console.log(url);

    var user = {
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
      console.log(json);
      this.accessToken = json['accesstoken'];
      this.refreshTokenv = json['refreshtoken'];
      console.log(this.accessToken);
      console.log(this.refreshTokenv);

      localStorage.setItem('accesstoken', json['accesstoken']);
      console.log(localStorage.getItem('accesstoken'));

      localStorage.setItem('refreshtoken', json['refreshtoken']);
      console.log("hier ist der Refreshtoken: "+localStorage.getItem('refreshtoken'));
      const currentTimeMillis: number = Math.floor(new Date().getTime() / 1000);
      const oneDayInSeconds: number = 24 * 60 * 60; // 24 hours * 60 minutes * 60 seconds

      const futureTimeMillis: number = currentTimeMillis + oneDayInSeconds;

      localStorage.setItem('refreshtokenexp', ""+futureTimeMillis);

      const accessLogin = localStorage.getItem('accesstoken');

      console.log(jwtDecode(accessLogin))

      this.router.navigate(['/veri']);
      


      
    }).catch(err => {
      console.log(err);
    });
    return null;
  }

  authenticate(number: string){
    const token = localStorage.getItem('accesstoken');
    console.log(token);
    const url = `https://ballermetrics-backend2.onrender.com/registration/login/`+token+"/"+number;
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    console.log(url,requestOptions);

    fetch(url)
    .then(res => {
      if(!res.ok)
      {
        console.log("fetch fehler");
      }
      return res.json();
    }).then(json => {
      console.log(json);
      localStorage.setItem('accesstokenauth', json['token']);
    }).catch(err => console.log(err));


  }

  refreshToken(): void {
    // Make refresh token request, obtain a new access token, and update the saved token
    const url = 'https://ballermetrics-backend2.onrender.com/registration/refresh';
        
        const refreshToken = localStorage.getItem('refreshtoken');
        console.log(refreshToken);

        var tkn = {
        refreshToken: refreshToken
        }

        console.log(tkn);

        var init: RequestInit = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tkn)
        };

        console.log(init);

        fetch(url, init)
        .then(res => {
        if(!res.ok)
        {
            console.log("fetch fehler");
        }
        return res.json();
        }).then(json => {
        console.log(json);
        localStorage.setItem('accesstoken', json['accesstoken']);
        

        localStorage.setItem('refreshtoken', json['refreshtoken']);
        

        
        }).catch(err => console.log(err));

  }

  isAuthenticatedAccessToken(): boolean {
    const accessLogin = localStorage.getItem('accesstoken');
    const accessauth = localStorage.getItem('accesstokenauth');

    const decodedToken: any = jwtDecode(accessLogin);

    const exp: number = decodedToken.exp;

    const currentTimeMillis: number = Math.floor(new Date().getTime() / 1000);

    const check = exp - currentTimeMillis;

    if(check < 0)
    {
      return false;
    }
    else{
      return true;
    }

  }

  isAuthenticatedRefreshtokenToken(): boolean {
    /*const refreshtoken = localStorage.getItem('refreshtoken');

    const currentTimeMillis = new Date().getTime();
    let millis: number = 0;
    

    console.log(refreshtoken);

    const url = `${environment.apiUrl}registration/getExpireDate`;

    console.log(url);
    var token = {
        refreshToken: refreshtoken
      }
  
      
  
      var init: RequestInit = {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(token)
      };
  
      console.log(init);

      fetch(url, init)
      .then(res => {
      if(!res.ok)
      {
          console.log("fetch fehler");
      }
      return res.json();
      }).then(json => {
      console.log(json);
      millis = json;

      
      }).catch(err => console.log(err));


      const check = millis - currentTimeMillis;*/

      /*const refreshToken = localStorage.getItem('refreshtokenexp');

        console.log(refreshToken);

        const n = parseInt(refreshToken);

        const currentTimeMillis: number = Math.floor(new Date().getTime() / 1000);

        const check = n - currentTimeMillis;
        console.log(check);*/

        const refreshToken = localStorage.getItem('refreshtokenexp');

        console.log(refreshToken);

        const n = parseInt(refreshToken);

        const currentTimeMillis: number = Math.floor(new Date().getTime() / 1000);

        const check = n - currentTimeMillis;
        console.log(check);


        if(check < 0)
        {
          return false;
        }
        else{
          return true;
        }
  }

  isTokenEmpty(): boolean
  {
    const accessLogin = localStorage.getItem('accesstoken');
            const refreshToken = localStorage.getItem('refreshtoken');
            console.log(accessLogin);

            if(accessLogin == null && refreshToken == null)
            {
                
            return true;
            }
            else{
               
            return false;
            }
    

  }
}
