import { Injectable } from '@angular/core';
import { Note } from './tile/tile.component';
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes: Note[] = [
    { letter: 'A', octave: 1 },
    { letter: 'A#', octave: 1 },
    { letter: 'B', octave: 1 },
    { letter: 'C', octave: 1 },
    { letter: 'C#', octave: 1 },
    { letter: 'D', octave: 1 },
    { letter: 'D#', octave: 1 },
    { letter: 'E', octave: 1 },
    { letter: 'F', octave: 1 },
    { letter: 'F#', octave: 1 },
    { letter: 'G', octave: 1 },
    { letter: 'G#', octave: 1 },
    { letter: 'A', octave: 2 },
    { letter: 'A#', octave: 2 },
    { letter: 'B', octave: 2 },
    { letter: 'C', octave: 2 },
    { letter: 'C#', octave: 2 },
    { letter: 'D', octave: 2 },
    { letter: 'D#', octave: 2 },
    { letter: 'E', octave: 2 },
    { letter: 'F', octave: 2 },
    { letter: 'F#', octave: 2 },
    { letter: 'G', octave: 2 },
    { letter: 'G#', octave: 2 },
    { letter: 'A', octave: 3 },
    { letter: 'A#', octave: 3 },
    { letter: 'B', octave: 3 },
    { letter: 'C', octave: 3 },
    { letter: 'C#', octave: 3 },
    { letter: 'D', octave: 3 },
    { letter: 'D#', octave: 3 },
    { letter: 'E', octave: 3 },
    { letter: 'F', octave: 3 },
    { letter: 'F#', octave: 3 },
    { letter: 'G', octave: 3 },
    { letter: 'G#', octave: 3 },
    { letter: 'A', octave: 4 },
    { letter: 'A#', octave: 4 },
    { letter: 'B', octave: 4 },
    { letter: 'C', octave: 4 },
    { letter: 'C#', octave: 4 },
    { letter: 'D', octave: 4 },
    { letter: 'D#', octave: 4 },
    { letter: 'E', octave: 4 },
    { letter: 'F', octave: 4 },
    { letter: 'F#', octave: 4 },
    { letter: 'G', octave: 4 },
    { letter: 'G#', octave: 4 },
    { letter: 'A', octave: 5 },
    { letter: 'A#', octave: 5 },
    { letter: 'B', octave: 5 },
    { letter: 'C', octave: 5 },
    { letter: 'C#', octave: 5 },
    { letter: 'D', octave: 5 },
    { letter: 'D#', octave: 5 },
    { letter: 'E', octave: 5 },
    { letter: 'F', octave: 5 },
    { letter: 'F#', octave: 5 },
    { letter: 'G', octave: 5 },
    { letter: 'G#', octave: 5 },
    { letter: 'A', octave: 6 },
    { letter: 'A#', octave: 6 },
    { letter: 'B', octave: 6 },
    { letter: 'C', octave: 6 },
    { letter: 'C#', octave: 6 },
    { letter: 'D', octave: 6 },
    { letter: 'D#', octave: 6 },
    { letter: 'E', octave: 6 },
    { letter: 'F', octave: 6 },
    { letter: 'F#', octave: 6 },
    { letter: 'G', octave: 6 },
    { letter: 'G#', octave: 6 },
    { letter: 'A', octave: 7 },
    { letter: 'A#', octave: 7 },
    { letter: 'B', octave: 7 },
    { letter: 'C', octave: 7 },
    { letter: 'C#', octave: 7 },
    { letter: 'D', octave: 7 },
    { letter: 'D#', octave: 7 },
    { letter: 'E', octave: 7 },
    { letter: 'F', octave: 7 },
    { letter: 'F#', octave: 7 },
    { letter: 'G', octave: 7 },
    { letter: 'G#', octave: 7 },
    { letter: 'A', octave: 8 },
    { letter: 'A#', octave: 8 },
    { letter: 'B', octave: 8 },
    { letter: 'C', octave: 8 },
    { letter: 'C#', octave: 8 },
    { letter: 'D', octave: 8 },
    { letter: 'D#', octave: 8 },
    { letter: 'E', octave: 8 },
    { letter: 'F', octave: 8 },
    { letter: 'F#', octave: 8 },
    { letter: 'G', octave: 8 },
    { letter: 'G#', octave: 8 },
    { letter: 'A', octave: 9 },
    { letter: 'A#', octave: 9 },
    { letter: 'B', octave: 9 },
    { letter: 'C', octave: 9 },
    { letter: 'C#', octave: 9 },
    { letter: 'D', octave: 9 },
    { letter: 'D#', octave: 9 },
    { letter: 'E', octave: 9 },
    { letter: 'F', octave: 9 },
    { letter: 'F#', octave: 9 },
    { letter: 'G', octave: 9 },
    { letter: 'G#', octave: 9 },
  ].sort((a, b) => {
    let aValue = parseInt(a.letter[0], 17) + (a.letter.includes('#') ? 0.5 : 0);
    let bValue = parseInt(b.letter[0], 17) + (b.letter.includes('#') ? 0.5 : 0);
    return aValue - bValue;
  }) as Note[];

  noteMap: Map<string, number> = new Map<string, number>(
    this.notes.map((note, index) => {
      return [note.letter + note.octave, index];
    })
  );
  notesBeingPlayed = new Map<string, Tone.Synth<Tone.SynthOptions>>();

  getIndex(note: Note): number {
    return this.noteMap.get(note.letter + note.octave) || 0; // for some reason its unable to get A1 so return if unfound this literally makes no sense
  }

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

  async initAudio() {
    await Tone.start();
  }

  startNoteAudio(note: Note) {
    if (this.notesBeingPlayed.get(note.letter + note.octave)) {
      return;
    }
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    synth.triggerAttack(note.letter + note.octave, now);
    this.notesBeingPlayed.set(note.letter + note.octave, synth);
  }
  stopNoteAudio(note: Note) {
    console.log(this.notesBeingPlayed.get(note.letter + note.octave));
    this.notesBeingPlayed.get(note.letter + note.octave)?.triggerRelease();
    this.notesBeingPlayed.delete(note.letter + note.octave);
  }
}
