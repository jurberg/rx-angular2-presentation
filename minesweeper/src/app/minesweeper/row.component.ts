import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'row',
    template: `
  <div class="row">
      <tile *ngFor="let tile of row" [tile]="tile" (click)="handleTileClick(tile)"></tile>
    </div>
  `
})
export class RowComponent {
    @Input() row: any;
    @Output() tileClick: EventEmitter<any> = new EventEmitter();

    ngOnChanges() {
        console.log('Row changed');
    }

    handleTileClick(tile) {
        this.tileClick.next(tile);
    }

}
