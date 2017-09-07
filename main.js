(function () {
    setup(() => {
        size(500, 500);
        fill(255);
    });

    let color = [255];
    let counter = 0;

    draw(() => {
        background(...color);
    });

    mouseMoved(() => {
        color = [(mouseX / width) * 255, (mouseY / height) * 255, (counter += 10) % 255];
    });
}());