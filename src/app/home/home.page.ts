import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../components/chat/chat.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public chatRooms: any = [];

  constructor(private svc:AuthService, private router:Router, private chatSvc:ChatService, public modalCtrl: ModalController) {}

  logOut(){
    this.svc.logOut();
  }
  ngOnInit() {
    this.chatSvc.getChatRooms().subscribe(chats =>{
      
      this.chatRooms = chats;
    })
  }

  openchat(item){
    this.modalCtrl.create({
      component: ChatComponent,
      componentProps: {
        chat: item
      }
    }).then((modal)=> modal.present())
  }
}
