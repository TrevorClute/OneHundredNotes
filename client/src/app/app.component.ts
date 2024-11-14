import {
  Component,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Note, TileComponent } from './tile/tile.component';
import { NotesService } from './notes.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [TileComponent],
})
export class AppComponent {
  constructor(
    private socketService: SocketService,
    private notesService: NotesService
  ) {
    this.notes = notesService.notes;
    this.initAudio = async () => {
      this.loading = true;
      await notesService.initAudio();
      this.loading = false;
      this.audioEnabled = true;
    };
  }
  notes: Note[];
  initAudio: () => Promise<void>;
  audioEnabled = false;
  loading = false;

  @ViewChildren(TileComponent) tiles!: QueryList<TileComponent>;

  ngAfterViewInit() {
    this.socketService.onNoteStart().subscribe((note) => {
      this.tiles.get(this.notesService.getIndex(note))?.startNoteRecieved();
    });

    this.socketService.onNoteStop().subscribe((note) => {
      this.tiles.get(this.notesService.getIndex(note))?.stopNoteRecieved();
    });
  }
}
