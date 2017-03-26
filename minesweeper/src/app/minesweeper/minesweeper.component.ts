import { Component, Input } from '@angular/core';
import {partition} from './util';
import {revealTile, isGameOver} from './game';
import {List} from 'immutable';

@Component({
    selector: 'minesweeper',
    template: `
  <div class="board">
    <row *ngFor="let row of rows" [row]="row" (tileClick)="handleTileClick($event)"></row>
  </div>
  `
})
export class MinesweeperComponent {
    @Input() game: any;
    rows;
    history = List();

    ngOnChanges(changes) {
        // Only update game when game has actually changed
        if (changes.hasOwnProperty('game')) {
            this.updateGame()
        }
    }

    updateGame(updateHistory = true) {
        this.rows = partition(this.game.get('cols'), this.game.get('tiles'));
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
