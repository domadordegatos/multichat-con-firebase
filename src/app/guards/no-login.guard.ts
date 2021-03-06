import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {

  constructor(private auth:AngularFireAuth, private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      
      return this.auth.authState.pipe(map(auth =>{
        console.log(auth);
        if(isNullOrUndefined(auth)){
          return true;
        }else{
          this.router.navigate(['/home'])
          return true;
        }
      }))

  }
  
}
