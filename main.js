setup(() => {
    size(500, 500);
    textSize(40);
    stroke(255);
    textAlign(CENTER, CENTER);
    noFill();
});

let color = [0];
let counter = 0;

draw(() => {
    background(...color);
    noFill();
    if (isMousePressed) {
        ellipse(mouseX, mouseY, 200, 200);
    }
    const time = new Date();
    arc(width / 2, height / 2, 160, 160, 0, TWO_PI * (time.getSeconds() / 60));
    arc(width / 2, height / 2, 180, 180, 0, TWO_PI * (time.getMinutes() / 60));
    arc(width / 2, height / 2, 200, 200, 0, TWO_PI * (time.getHours() / 24));
    fill(255);
    text(`${time.getHours()}:${time.getMinutes()}`, width / 2, height / 2);
});

mouseMoved(() => {
    color = [(mouseX / width) * 155 + 100, 150, (mouseY / height) * 155 + 100];
});