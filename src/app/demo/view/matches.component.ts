import { Component } from '@angular/core';
import {SelectItem} from 'primeng/api';
import {Product} from '../domain/product';
import {ProductService} from '../service/productservice';
import {AppBreadcrumbService} from '../../app.breadcrumb.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html'
})
export class MatchesComponent {

  products: Product[];

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    sourceCities: any[];

    targetCities: any[];

    orderCities: any[];

    constructor(private productService: ProductService, private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'UI Kit'},
            {label: 'List'}
        ]);
    }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.sourceCities = [
            {name: 'Graz', code: 'GRZ'},
            {name: 'WIEN', code: 'VNE'},
            {name: 'MÜNCHEN', code: 'MNCH'}];
        this.targetCities = [];

        this.orderCities = [
            {name: 'San Francisco', code: 'SF'},
            {name: 'London', code: 'LDN'},
            {name: 'Paris', code: 'PRS'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Berlin', code: 'BRL'},
            {name: 'Barcelona', code: 'BRC'},
            {name: 'Rome', code: 'RM'}];

        this.sortOptions = [
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'}
        ];


        var options = {
            method: 'GET'
          };

          
          fetch("https://ballermetrics-backend2.onrender.com/teams/newest", options)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.showPlayer(result);
            })
            .catch(error => console.log('error', error));
    }

    showPlayer(json:any)
    {
        console.log("drinnen");
        console.log(json);
        

        var output="";

        for(let i in json)
        {
            console.log("home: "+json[i]['home_team_id']['full_name']);
            console.log("visitor: "+json[i]['visitor_team_id']['full_name']);
            console.log("season: "+json[i]['season']);
            console.log("homes: "+json[i]['home_team_score']);
            console.log("visitors: "+json[i]['visitor_team_score']);

            const homeTeamName = json[i]['home_team_id']['full_name'];
            const visitorTeamName = json[i]['visitor_team_id']['full_name'];
            const season = json[i]['season'];
            const homescore = json[i]['home_team_score'];
            const visitorScore = json[i]['visitor_team_score'];


            output += (`<div class="flex flex-column md:flex-row align-items-center p-3 w-full">
            <img [src]='./assets/lakers.jpg'/>
            <div class="flex-1 text-center md:text-center">
                <div class="font-bold text-2xl">${homeTeamName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${visitorTeamName}</div>
                <div class="mb-3">USA</div>
                <div class="mb-3">Season: ${season}</div>
                <div class="font-bold text-2xl">Score: ${homescore} / ${visitorScore}</div>
            </div>


            <div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                <p-button icon="pi pi-arrow-right" label="weitere Infos" class="mb-2"></p-button>
            </div>
        </div>`)

            console.log(output);
            console.log(document.getElementById('newestmatches').innerHTML);
            document.getElementById('newestmatches').innerHTML = output;

        }

        
        
    }

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

}
