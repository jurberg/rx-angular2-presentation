import {Component, Input} from '@angular/core';

@Component({
    selector: 'tile',
    template: `
  <div class="tile" [class.mine]="tile.get('isMine')">
    <div class="lid" *ngIf="!tile.get('isRevealed')"></div>
    <div *ngIf="tile.get('isRevealed') && !tile.get('isMine')">
      {{ tile.get('threatCount') > 0 ? tile.get('threatCount') : '' }}
    </div>
  </div>
  `
})
export class TileComponent {
    @Input() tile: any;

    ngOnChanges(changes) {
        if (changes.tile) {
            console.log('Tile %s changed', this.tile.get('id'));
        }
    }

}
