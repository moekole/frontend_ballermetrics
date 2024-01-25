import { Component } from '@angular/core';
import { BallerserviceService } from '../auth/ballerservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-veri',
  templateUrl: './veri.component.html'
})
export class VeriComponent {

  constructor(private authservice: BallerserviceService){};

  onInput(event: any, nextInputIndex?: number) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const maxLength = inputElement.maxLength;

    if (inputValue.length >= maxLength && nextInputIndex !== undefined) {
      const nextInputElement = document.getElementById(`input${nextInputIndex}`) as HTMLInputElement;
      if (nextInputElement) {
        nextInputElement.focus();
      }
    }
  }

  authenticate()
  {
    const input1f = document.getElementById('input1') as HTMLInputElement;
    const input2f = document.getElementById('input2') as HTMLInputElement;
    const input3f = document.getElementById('input3') as HTMLInputElement;
    const input4f = document.getElementById('input4') as HTMLInputElement;

    const input1 = input1f.value;
    const input2 = input2f.value;
    const input3 = input3f.value;
    const input4 = input4f.value;

    const number = input1 + input2 + input3 + input4;

    console.log(input1, input2, input3, input4);
    console.log(number);

    

    this.authservice.authenticate(number);

    /*const jwtaccesstoken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyODAyIiwiaWF0IjoxNjkzMzg1NzUxLCJleHAiOjE2OTMzODY2NTF9.mEl_yd8Qjbr7hZ00iSeFfbw7YR4SvYrajBvBLCNjl6c';
    
    const url = `${environment.apiUrl}registration/login/`+jwtaccesstoken+"/"+number;
  

    console.log(url);

    fetch(url)
    .then(res => {
      if(!res.ok)
      {
        console.log("fetch fehler");
      }
      return res.json();
    }).then(json => {
      console.log(json);
    }).catch(err => console.log(err));*/


    
  }

}
