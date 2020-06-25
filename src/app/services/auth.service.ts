import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { rejects } from 'assert';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authFire:AngularFireAuth, private router:Router, private db:AngularFirestore) { }

  login(email:string,pass:string){
    return new Promise((resolve, reject)=>{
      this.authFire.signInWithEmailAndPassword(email,pass)
      .then( userData=> resolve(userData),
      err => reject (err));
    });
  }
  logOut(){
      this.authFire.signOut().then(auth=>{
        this.router.navigate(['/login'])
      })
  }
  register(email:string, password:string, name:string){
    return new Promise ((resolve, reject)=>{
      this.authFire.createUserWithEmailAndPassword(email,password).then(res=>{

        console.log(res.user.uid);
        
        const uid = res.user.uid;

        this.db.collection('users').doc(uid).set({
          name: name,
          uid:uid
        })

        resolve(res)
      }).catch(err => reject(err))
    })
  }
}
