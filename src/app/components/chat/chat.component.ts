import { mensaje } from './../../models/message';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public chat:any;
  public mensajes = [];
  public mensaje : mensaje;
  public msg : string;
  public room:any;
  
  constructor(private navParams:NavParams, private modalCtrl:ModalController, private chatSvc:ChatService) { }

  ngOnInit() {
    this.chatSvc.getChatRoom(this.chat.id).subscribe( room=>{
      console.log(room);
      this.room = room;
    })
     this.chat = this.navParams.get('chat');
  }

  sendText(){

      const mensaje : mensaje ={
        content: this.msg,
        type: 'text',
        date: new Date()
      }

    /* this.mensajes.push(this.msg) */

    this.chatSvc.sendMSG(mensaje,this.chat.id)
    this.msg ="";
  }


}
