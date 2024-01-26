import {Component} from '@angular/core';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import { jwtDecode } from 'jwt-decode';

// Define a global constant string
export const GLOBAL_CONSTANT_STRING: string = "Default Name";


@Component({
    selector: 'app-topbar',
    template: `
        <div class="layout-topbar">
            <div class="layout-topbar-wrapper">
                <div class="layout-topbar-left">
                    <div class="layout-topbar-logo" id="logolink" style="cursor: pointer; outline: none;" routerLink="/">
                        <img id="app-logo"
                             [src]="'assets/layout/images/logo.png'"
                             alt="poseidon-layout">
                    </div>
                </div>

                <div class="layout-topbar-right">
                    <a class="menu-button" href="#" (click)="appMain.onMenuButtonClick($event)">
                        <i class="pi pi-bars"></i>
                    </a>

                    <ul class="layout-topbar-actions">
                        
                        
                        
                        
                        <li #profile class="topbar-item user-profile"
                            >
                            <a href="#">
                                <img class="profile-image" src="assets/layout/images/avatar-profile.png" alt="demo">
                                <div class="profile-info" id="nametopbar">
                                    <h6>${GLOBAL_CONSTANT_STRING}</h6>
                                    <span>Lakers-Fan</span>
                                </div>
                            </a>

                            <ul class="fadeInDown">
                                <li class="layout-submenu-header">
                                    <img class="profile-image" src="assets/layout/images/avatar-profile.png" alt="demo">
                                    <div class="profile-info">
                                        <h6>${GLOBAL_CONSTANT_STRING}</h6>
                                        <span>Webmaster</span>
                                    </div>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-cog"></i>
                                        <h6>Settings</h6>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-file"></i>
                                        <h6>Terms of Usage</h6>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-compass"></i>
                                        <h6>Support</h6>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-power-off"></i>
                                        <h6>Logout</h6>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    
                </div>
            </div>
        </div>
    `
})
export class AppTopBarComponent {

    constructor(public appMain: AppMainComponent, public app: AppComponent) {
    }

    private accountname: string = "Benjamin";

    ngOnInit(){
        this.loadname;
        console.log("bin da");
        
        const accessLogin = localStorage.getItem('accesstoken');
        const accessauth = localStorage.getItem('accesstokenauth');

        const decodedToken: any = jwtDecode(accessLogin);

        const exp: number = decodedToken.sub;

        var options2 = {
            method: 'GET'
        };

          
          fetch("https://ballermetrics-backend2.onrender.com/user/name/"+exp, options2)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.loadname(result);
            })
            .catch(error => console.log('error', error));

        
    }
    

    loadname(json:any){
        const name = json['token'];
        var output="";

        output=(`<h6>${name}</h6>
        <span>Lakers-Fan</span>`);

        document.getElementById('nametopbar').innerHTML = output;

    }

}
