import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public email:string;
  public password:string;
  public name:string;
  constructor(private authSvc:AuthService,private LoadingCtrl:LoadingController, 
    private alertCtrl: AlertController,
    private router:Router) { }

  ngOnInit() {
  }
  register(){
    this.presentLoading();
    this.authSvc.register(this.email,this.password,this.name).then(res=>{
      this.LoadingCtrl.dismiss();
      this.presentAlert('Cuenta creada con Exito!!','Registro');
      this.router.navigate(['/home'])
      console.log(res)
    }).catch(err => console.log(err))
  }



  async presentLoading() {
    const loadingg = await this.LoadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...'
    });
    await loadingg.present();
  }
  async presentAlert(messagee:string,title:string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: title,
      message: messagee,
      buttons: ['OK']
    });
    await alert.present();
  }
}
