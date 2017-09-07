
(function () {

    setup(() => {
        size(500, 500);
    });

    let color = [];

    draw(() => {
        background(100, 150, 100);
        fill(...color);
        if (isMousePressed) {
            rect(mouseX, mouseY, 100, 100);
        }
    });

    mousePressed(() => {
        color = [mouseX % 255, mouseY % 255, random(255)];
        console.log(color);
    });

}());
