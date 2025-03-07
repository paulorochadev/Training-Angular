import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms/rooms';

@Component({
  selector: 'app-rooms-list',
  imports: [ CommonModule ],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rooms: RoomList[] = [];
  // @Input() rooms: RoomList[] | null = [];

  @Input() title: string = '';

  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if (changes['title']) {
      const title = changes['title'].currentValue;
      if (title) {
        this.title = title.toUpperCase();
      }
    }
  }

  ngOnInit(): void {
    
  }

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }

  ngOnDestroy(): void {
    console.log('on destroy is called');
  }
}