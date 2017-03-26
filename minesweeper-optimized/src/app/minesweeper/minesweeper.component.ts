import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { List } from 'immutable';
import { revealTile, isGameOver } from './game';

@Component({
  selector: 'minesweeper',
  template: `
  <div class="board">
    <tile *ngFor="let tile of getTiles()" [tile]="tile" (tileClick)="handleTileClick($event)"></tile>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinesweeperComponent {
  @Input() game: any;
  history = List();

  getTiles() {
    return this.game ? this.game.get('tiles') : [];
  }

  updateGame(updateHistory = true) {
    if (updateHistory) {
      this.history = this.history.push(this.game);
    }
  }

  handleTileClick(tile) {
    if (!tile) {
      return;
    }
    if (isGameOver(this.game)) {
      return;
    }
    const newGame = revealTile(this.game, tile.get('id'));
    if (newGame !== this.game) {
      this.game = newGame;
      this.updateGame();
    }
    if (isGameOver(this.game)) {
      window.alert('GAME OVER!');
    }
  }

  undo() {
    if (this.canUndo()) {
      console.log('undo');
      this.history = this.history.pop();
      this.game = this.history.last();

      // Don't update the history so we don't end up with
      // the same game twice in the end of the list
      this.updateGame(false);
    }
  }

  canUndo() {
    return this.history.size > 1;
  }

}
