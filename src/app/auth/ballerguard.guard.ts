import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BallerserviceService } from './ballerservice.service';


@Injectable({
  providedIn: 'root'
})
export class BallerguardGuard implements CanActivate {
  constructor(private r: Router, private authservice: BallerserviceService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      
      if (this.authservice.isTokenEmpty()) {
        this.r.navigateByUrl('login');
        return false;
      }
      else {
        if (this.authservice.isAuthenticatedRefreshtokenToken()) {
          if (this.authservice.isAuthenticatedAccessToken()) {
            return true;
          }
          else {
            this.authservice.refreshToken();
            return true;
          }
        }
        else {
          this.r.navigateByUrl('login');
          return false;
  
        }
      }
  
  
  
  
  
  
  
  
  
  
  
  
      //this.r.navigateByUrl('login');
      //thsi.b2bservice isauthenticate
      return true;
  
    }
  }
  

