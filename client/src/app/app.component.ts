import {
  Component,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Note, TileComponent } from './tile/tile.component';
import { NOTES } from './notes';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [TileComponent],
})
export class AppComponent {
  constructor(private socketService: SocketService) {}

  notes: Note[] = NOTES.sort((a, b) => {
    let aValue = parseInt(a.letter[0], 17) + (a.letter.includes('#') ? 0.5 : 0);
    let bValue = parseInt(b.letter[0], 17) + (b.letter.includes('#') ? 0.5 : 0);
    return aValue - bValue;
  });
  @ViewChildren(TileComponent) tiles!: QueryList<TileComponent>;
  tileMap: Map<Note, TileComponent> = new Map<Note, TileComponent>();

  ngAfterViewInit() {
    this.tiles.forEach((tile) => {
      this.tileMap?.set(tile.note, tile);
    });
  }
}
