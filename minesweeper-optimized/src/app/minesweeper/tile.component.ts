import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'tile',
  template: `
  <div class="tile" [class.mine]="tile.get('isMine')" (click)="handleTileClick(tile)">
    <div class="lid" *ngIf="!tile.get('isRevealed')"></div>
    <div *ngIf="tile.get('isRevealed') && !tile.get('isMine')">
      {{ tile.get('threatCount') > 0 ? tile.get('threatCount') : '' }}
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {
  @Input() tile: any;
  @Output() tileClick: EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes) {
    if (changes.tile) {
      console.log('Tile %s changed', this.tile.get('id'));
    }
  }

  handleTileClick(tile) {
    this.tileClick.next(tile);
  }

}
