import { Injectable } from '@angular/core';
import { Note } from './tile.component';
import { SocketService } from '../socket.service';

@Injectable({
  providedIn: 'root',
})
export class TileService {
  constructor(private socketService: SocketService) {}

  noteToColor(note: Note): string {
    //only works up to G and octave 9
    return (
      '#' +
      (parseInt(note.letter[0], 17) - 1 - note.octave).toString(16) +
      (note.letter.includes('#') ? '8' : '0') +
      '44' +
      note.octave.toString(16) +
      '0'
    );
  }

  sendNoteStart(note: Note) {
    this.socketService.sendNoteStart(note);
  }
  sendNoteStop(note: Note) {
    this.socketService.sendNoteStop(note);
  }
}
