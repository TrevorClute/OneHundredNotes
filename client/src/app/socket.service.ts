import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Note } from './tile/tile.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  constructor() {
    // this.socket = io('https://onehundrednotes-production.up.railway.app/');
    //this.socket = io('http://10.233.206.173:3000');
    //insert your localhostip address or just use localhost if not using other devices
    //this.socket = io('http://192.168.0.33:3000');
    this.socket = io('https://onehundrednotes.onrender.com');
  }
  sendNoteStart(note: Note) {
    this.socket.emit('note-start', note);
  }
  sendNoteStop(note: Note) {
    this.socket.emit('note-stop', note);
  }

  onNoteStart(): Observable<Note> {
    return new Observable((subscriber) => {
      this.socket.on('note-start', (data) => {
        subscriber.next(data);
      });
    });
  }

  onNoteStop(): Observable<Note> {
    return new Observable((subscriber) => {
      this.socket.on('note-stop', (data) => {
        subscriber.next(data);
      });
    });
  }
}
