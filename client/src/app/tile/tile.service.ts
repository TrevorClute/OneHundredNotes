import { Injectable } from '@angular/core';
import { Note } from './tile.component';
import { SocketService } from '../socket.service';
import { NotesService } from '../notes.service';

@Injectable({
  providedIn: 'root',
})
export class TileService {
  constructor(
    private socketService: SocketService,
    private notesService: NotesService
  ) {}
  noteToColor(note: Note): string {
    return this.notesService.noteToColor(note);
  }
  sendNoteStart(note: Note) {
    this.socketService.sendNoteStart(note);
  }
  sendNoteStop(note: Note) {
    this.socketService.sendNoteStop(note);
  }
  startNoteAudio(note: Note) {
    this.notesService.startNoteAudio(note);
  }
  stopNoteAudio(note: Note) {
    this.notesService.stopNoteAudio(note);
  }
}
