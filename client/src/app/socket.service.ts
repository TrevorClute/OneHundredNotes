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
    this.socket = io('http://localhost:80');
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
