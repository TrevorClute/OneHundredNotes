import { Component, Input } from '@angular/core';
import { Note, TileComponent } from './tile/tile.component';
import { NOTES } from './notes';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [TileComponent],
})
export class AppComponent {
  notes: Note[] = NOTES.sort((a, b) => {
    let aValue = parseInt(a.letter[0], 17) + (a.letter.includes('#') ? 0.5 : 0);
    let bValue = parseInt(b.letter[0], 17) + (b.letter.includes('#') ? 0.5 : 0);
    return aValue - bValue;
  });
}
