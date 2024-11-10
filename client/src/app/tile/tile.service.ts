import { Injectable } from '@angular/core';
import { Note } from './tile.component';

@Injectable({
  providedIn: 'root',
})
export class TileService {
  constructor() {}

  noteToColor(note: Note): string {
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
    //send note
  }
  sendNoteStop(note: Note) {
    //send note
  }
}
