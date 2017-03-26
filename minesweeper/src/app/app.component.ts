import { Component } from '@angular/core';
import { createGame } from './minesweeper/game';

@Component({
  selector: 'app',
  template: `
  <minesweeper [game]="game" #minesweeper></minesweeper>
  <ul class="actions">
    <li><a (click)="startNewGame()">New game</a></li>
    <li><a (click)="minesweeper.undo()" [hidden]="!minesweeper.canUndo()">Undo</a></li>
  </ul>
  `
})
export class AppComponent {
  public game;

  ngOnInit() {
    this.startNewGame();
  }

  ngOnChanges() {
    console.log('App changed');
  }

  startNewGame() {
    this.game = createGame({cols: 16, rows: 16, mines: 48});
  }

}
