import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string;
  password:string;
  constructor(private authSvc:AuthService, 
    private LoadingCtrl:LoadingController, 
    private alertCtrl: AlertController,
    private router:Router) { 
  }

  ngOnInit() {
  }

  login(){
      this.presentLoading();
      this.authSvc.login(this.email,this.password).then((res)=>{
        console.log("estas logeuado");
        this.LoadingCtrl.dismiss();
        this.router.navigate(['/home']);
      }).catch((err)=>{
        console.log("vista",err);
        if(err.code === "auth/wrong-password"){
          console.log("contraseña incorrecta");
          this.LoadingCtrl.dismiss();
          this.presentAlert('Contraseña Incorrecta');
        }else if(err.code === "auth/invalid-email" || err.code === "auth/user-not-found" || err.code === "auth/argument-error"){
          console.log("usuario no encontrado");
          this.LoadingCtrl.dismiss();
          this.presentAlert('Usuario no Encontrado');
        }
      })
  }


  async presentLoading() {
    const loadingg = await this.LoadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...'
    });
    await loadingg.present();
  }
  async presentAlert(messagee:string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: messagee,
      buttons: ['OK']
    });
    await alert.present();
  }
}
