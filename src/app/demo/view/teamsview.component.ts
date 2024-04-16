import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teamsview',
  templateUrl: './teamsview.component.html'
})
export class TeamsviewComponent {
  constructor(private router: Router) 
    {}

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams()
  {
    

    const url = "https://ballermetrics-backend2.onrender.com/players/teams";

    fetch(url)
        .then(res => {
        if(!res.ok)
        {
            console.log("fetch fehler");
        }
        return res.json();
        }).then(json => {
        console.log(json);
          this.showTeams(json);

        
        }).catch(err => console.log(err));
  }

  showTeams(json:any)
  {
    var output="";
    for(let i in json)
    {
      const teamname = json[i]["teamname"];
      const image = json[i]["image_url"];
      const id = json[i]["id"];

      output += `<div class="surface-card p-4 shadow-2 border-round grid grid-cols-2 gap-4">
      <img src="${image}"  class="my-4 md:my-0 w-9 md:w-10rem shadow-2"/>
      <div>
        <div class="text-3xl font-medium text-900 mb-3">${teamname}</div>
        <div class="font-medium text-500 mb-3">In der Conference</div>
        <h6>Streak: W W L</h6>
        <button (click)="authenticate()">Hallo</button>
      </div>
      
  </div><br><br>`;

    }
    document.getElementById('content').innerHTML = output;

  }

  authenticate(){
    console.log("32432324342342342342324");
  }

  navigateToPlayer(number:any){
    this.router.navigate(['/login']);
  }


  loadName()
    {
        console.log("name:");
        const accessLogin = localStorage.getItem('accesstoken');
        const refreshToken = localStorage.getItem('refreshtoken');

        //const decodedToken: any = jwtDecode(accessLogin);

        //const exp: number = decodedToken.sub;

        const url1 = `https://ballermetrics-backend2.onrender.com/tradeGroupUser/getName/`;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + accessLogin);

        var requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

        fetch(url1, requestOptions)
        .then(res => {
        if(!res.ok)
        {
            console.log("fetch fehler");
        }
        return res.json();
        }).then(json => {
        console.log(json);
            

        
        }).catch(err => console.log(err));

    }

    

    showPlayers(json:any)
    {
        var output="";

        for(let i in json)
        {
            const firstname = json[i]['first_name'];
            const lastName = json[i]['last_name'];
            const position = json[i]['position']

            console.log(firstname+lastName+position);

            output+=(`<li>
                    <div class="person">
                        <img src="assets/layout/images/dashboard/leader-1.png" alt="poseidon-layout" />
                        <p>${firstname} ${lastName}</p>
                    </div>
                    <div class="person-numbers">
                        <h6>Position: ${position}</h6>
                        
                    </div>
                </li>`);
        }
        document.getElementById('playerList').innerHTML = output;
    }
  

}
