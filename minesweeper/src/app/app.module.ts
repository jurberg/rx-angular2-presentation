import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RowComponent } from './minesweeper/row.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { TileComponent } from './minesweeper/tile.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    RowComponent,
    MinesweeperComponent,
    TileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
