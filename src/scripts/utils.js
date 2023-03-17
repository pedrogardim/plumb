export const createSvgEl = (type) =>
  document.createElementNS('http://www.w3.org/2000/svg', type);

export const dirMap = { 0: 'top', 90: 'right', 180: 'bottom', 270: 'left' };

export const pathTypes = [
  { canConnect: [90, 270], d: 'm 0 100 h 200' },
  { canConnect: [180, 270], d: 'm 0 100 h 100 v 100' },
  { canConnect: [0, 90, 270], d: 'm 0 100 h 200 M 100 100 V 0' },
  { canConnect: [0, 90, 180, 270], d: 'm 0 100 h 200 M 100 200 V 0' },
];

export const getRandomType = () => {
  let weights = { 0: 0.5, 1: 0.2, 2: 0.2, 3: 0.1 };
  let table = [];
  for (let i in weights) {
    for (let j = 0; j < weights[i] * 10; j++) {
      table.push(i);
    }
  }
  return table[Math.floor(Math.random() * table.length)];
};
