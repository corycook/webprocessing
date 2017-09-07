setup(() => {
    size(500, 500);
    fill(255);
    textSize(20);
});

let color = [255];
let counter = 0;
let time = new Date().toTimeString();

setInterval(() => {
    time = new Date().toTimeString();
}, 1000);

draw(() => {
    background(...color);
    if (isMousePressed) {
        ellipse(mouseX, mouseY, 200, 200);
    }
    text(time, 50, 50);
});

mouseMoved(() => {
    color = [(mouseX / width) * 155 + 100, 150, (mouseY / height) * 155 + 100];
});