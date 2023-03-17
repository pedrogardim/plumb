import { createSvgEl, pathTypes, getRandomType } from '../scripts/utils.js';

export default class PumblrTile {
  element = createSvgEl('svg');
  g = createSvgEl('g');
  rotation = Math.floor(Math.random() * 4) * 90;
  type = getRandomType();
  connectedToWater = false;
  adjacents = {};
  connectedTo = [];

  constructor(cont, row, col, siblingTiles, id, updateGame) {
    this.id = id;
    this.cont = cont;
    this.x = row;
    this.y = col;
    this.siblingTiles = siblingTiles;
    this.canConnect = pathTypes[this.type].canConnect.map(
      (e) => (e + this.rotation) % 360
    );
    this.updateGame = updateGame;
    this.init();
  }

  init() {
    this.render();
    this.checkAdjecents();
    this.element.addEventListener('mousedown', () => this.clickHandler());
    //this.anim = setInterval(() => this.animation(), 100);
    this.update();
  }

  clickHandler() {
    this.rotation += 90;
    this.g.style.transform = `rotate(${this.rotation}deg)`;
    this.siblingTiles.forEach((e) => e.update());
    this.siblingTiles.forEach(() =>
      this.siblingTiles.forEach((e) => e.checkIfIsConnectedToWater())
    );
    this.updateGame();
  }

  update() {
    this.connectedToWater = false;

    this.canConnect = pathTypes[this.type].canConnect.map(
      (e) => (e + this.rotation) % 360
    );

    let connectedTo = [];

    for (let angle of Object.keys(this.adjacents)) {
      this.adjacents[angle].connectedTo = this.adjacents[
        angle
      ].connectedTo.filter((e) => e.id !== this.id);
      if (
        this.canConnect.includes(+angle) &&
        this.adjacents[angle].canConnect.includes((+angle + 180) % 360)
      ) {
        this.adjacents[angle].connectedTo.push(this);
        connectedTo.push(this.adjacents[angle]);
      }
    }

    this.connectedTo = connectedTo;
  }

  checkIfIsConnectedToWater() {
    this.connectedToWater =
      (this.id === 0 && this.canConnect.includes(0)) ||
      this.connectedTo.find((e) => e.connectedToWater);

    this.element.firstElementChild.lastElementChild.style.stroke = this
      .connectedToWater
      ? '#9be0e7'
      : '#444444';
  }

  checkAdjecents() {
    let adjacents = {};

    for (let tile of this.siblingTiles) {
      if (tile.x === this.x && tile.y - this.y === -1) {
        adjacents[0] = tile;
      }
      if (tile.x === this.x && tile.y - this.y === 1) {
        adjacents[180] = tile;
      }
      if (tile.y === this.y && tile.x - this.x === -1) {
        adjacents[270] = tile;
      }
      if (tile.y === this.y && tile.x - this.x === 1) {
        adjacents[90] = tile;
      }
    }

    this.adjacents = adjacents;
  }

  render() {
    this.element.setAttribute('x', this.x * 200);
    this.element.setAttribute('y', this.y * 200);
    this.element.setAttribute('width', '200px');
    this.element.setAttribute('height', '200px');
    this.element.setAttribute('viewBox', '0 0 200 200');
    this.element.style.height = 200;
    this.element.style.width = 200;
    this.cont.appendChild(this.element);
    this.element.appendChild(this.g);
    //
    let bg = createSvgEl('rect');
    bg.setAttribute('width', '200px');
    bg.setAttribute('height', '200px');
    bg.style.fill = 'transparent';
    //
    let path = createSvgEl('path');
    path.setAttribute('d', pathTypes[this.type].d);
    path.style.stroke = '#444444';
    path.style.strokeWidth = 20;
    path.style.fill = 'none';
    //
    // let text = createSvgEl('text');
    // text.setAttribute('x', 100);
    // text.setAttribute('y', 100);
    // text.textContent = this.id;
    // text.style.fontSize = 39;

    this.g.appendChild(bg);
    // this.element.appendChild(text);
    this.g.appendChild(path);

    this.g.style.transform = `rotate(${this.rotation}deg)`;
    this.g.style.transition = 'transform 0.2s ease-in-out';

    this.g.style.transformOrigin = '50% 50%';
  }
}
