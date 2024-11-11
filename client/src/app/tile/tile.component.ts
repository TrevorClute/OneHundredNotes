import {
  afterRender,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  numberAttribute,
  ViewChild,
} from '@angular/core';
import { TileService } from './tile.service';
export interface Note {
  letter:
    | 'A'
    | 'A#'
    | 'B'
    | 'C'
    | 'C#'
    | 'D'
    | 'D#'
    | 'E'
    | 'F'
    | 'F#'
    | 'G'
    | 'G#';
  octave: number;
}

@Component({
  selector: 'tile-component',
  standalone: true,
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css',
})
export class TileComponent {
  @Input({ required: true }) note!: Note;
  color!: string;
  mouseStatus: 'up' | 'down' = 'up';

  constructor(
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private tileService: TileService
  ) {
    afterRender(() => {
      const element = elementRef.nativeElement;
      element.addEventListener('touchstart', (e: TouchEvent) => {
        e.preventDefault();
        this.startNote();
        cdRef.detectChanges();
      });
      element.addEventListener('touchend', (e: TouchEvent) => {
        e.preventDefault();
        this.stopNote();
        cdRef.detectChanges();
      });
    });
  }

  private ngOnInit(): void {
    this.color = this.tileService.noteToColor(this.note);
  }

  startNote() {
    this.mouseStatus = 'down';
    this.color = '#000';
    this.tileService.sendNoteStart(this.note);
  }

  stopNote() {
    if (this.mouseStatus === 'up') return; //doesnt execute if mouse is up
    this.mouseStatus = 'up'; // sets mouse to up after confirming mouse is down
    this.color = this.tileService.noteToColor(this.note);
    this.tileService.sendNoteStop(this.note);
  }

  startNoteRecieved() {
    this.color = '#000';
  }

  stopNoteRecieved() {
    this.color = this.tileService.noteToColor(this.note);
  }
}
