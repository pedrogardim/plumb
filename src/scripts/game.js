import PumblrTile from './tile.js';

import { createSvgEl } from './utils.js';

export default class PumblrGame {
  cont = document.getElementById('main-view');
  sceneSize = [2000, 1200];
  tiles = [];
  ready = false;

  constructor(ctx) {
    this.addTiles();
    this.initScene();
    this.tiles.forEach((e) => e.onAllLoaded());
    this.done = false;
  }
  initScene() {
    const waterCircle = createSvgEl('circle');
    waterCircle.setAttribute('cx', 100);
    waterCircle.setAttribute('cy', -25);
    waterCircle.setAttribute('r', 40);
    waterCircle.style.fill = '#9be0e7';

    const exitCircle = createSvgEl('circle');
    exitCircle.setAttribute('cx', this.sceneSize[0] - 100);
    exitCircle.setAttribute('cy', this.sceneSize[1] + 25);
    exitCircle.setAttribute('r', 40);
    exitCircle.style.fill = '#222';

    this.cont.appendChild(waterCircle);
    this.cont.appendChild(exitCircle);
  }
  addTiles() {
    for (let row = 0; row < this.sceneSize[1] / 200; row++) {
      for (let col = 0; col < this.sceneSize[0] / 200; col++) {
        let id = row * 10 + col;
        this.tiles.push(
          new PumblrTile(
            this.cont,
            col,
            row,
            this.tiles,
            id,
            this.updateGame.bind(this)
          )
        );
      }
    }
  }
  updateGame() {
    this.done = true;
  }
}
