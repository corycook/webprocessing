const color = [0, 0, 0];

setup(() => {
  size(window.innerWidth, window.innerHeight);
});

draw(() => {
  const ix = floor(random(3));
  color[ix]++;
  stroke(...color);
  line(floor(random(width)), floor(random(height)), floor(random(width)), floor(random(height)));
});