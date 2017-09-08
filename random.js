const color = [0, 0, 0];

setup(() => {
  size(window.innerWidth, window.innerHeight);
});

draw(() => {
  const ix = floor(random(3));
  color[ix] = (color[ix] + 1) % 255;
  stroke(...color);
  line(floor(random(width)), floor(random(height)), floor(random(width)), floor(random(height)));
});