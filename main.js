const color = [0, 0, 0];
let lastPt = [0, 0];

setup(() => {
  size(window.innerWidth, window.innerHeight);
  lastPt = [floor(random(width)), floor(random(height))];
});

draw(() => {
  const ix = floor(random(3));
  const nextPt = [floor(random(width)), floor(random(height))];
  color[ix] = (color[ix] + 1) % 255;
  stroke(...color);
  line(lastPt[0], lastPt[1], nextPt[0], nextPt[1]);
  lastPt = nextPt;
});