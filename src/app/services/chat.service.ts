import { mensaje } from './../models/message';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';


export interface chat {
  description : string
  name : string
  id: string
  img : string
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db:AngularFirestore) { }

  getChatRooms(){
    
    return this.db.collection('chatRooms').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as chat;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }
  getChatRoom(chat_i:string){
    return this.db.collection('chatRooms').doc(chat_i).valueChanges()
  }
  sendMSG(message:mensaje, chat_id:string){
    this.db.collection('chatRooms').doc(chat_id).update({
      messages : firestore.FieldValue.arrayUnion(message)
    })
  }
}
