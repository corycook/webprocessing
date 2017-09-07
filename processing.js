(function () {
    const exports = window;
    let canvas = document.querySelector('canvas');
    let context = canvas && canvas.getContext('2d');

    const colorString = (r, g = r, b = r, a = 1) => {
        const f = v => Math.floor(v);
        return `rgba(${f(r)}, ${f(g)}, ${f(b)}, ${a})`;
    };

    exports.fill = (r, g = r, b = r, a = 1) => {
        Reflect.set(context, 'fillStyle', colorString(r, g, b, a));
    };

    exports.stroke = (r, g = r, b = r, a = 1) => {
        Reflect.set(context, 'strokeStyle', colorString(r, g, b, a));
    };

    exports.size = (w, h) => {
        exports.width = w;
        canvas.width = w;
        exports.height = h;
        canvas.height = h;
    };

    exports.rect = (x, y, width, height) => {
        context.fillRect(x, y, width, height);
        context.strokeRect(x, y, width, height);
    };

    const onsetup = new Promise((resolve) => {
        exports.setup = (fn) => {
            document.addEventListener('DOMContentLoaded', () => {
                if (!canvas) {
                    canvas = document.querySelector('canvas');
                    context = canvas.getContext('2d');
                }
                canvas.addEventListener('mousemove', (e) => {
                    exports.mouseX = e.clientX;
                    exports.mouseY = e.clientY;
                    exports.isMousePressed = e.buttons & 1 === 1;
                });
                window.addEventListener('mousedown', (e) => {
                    exports.isMousePressed = true;
                });
                window.addEventListener('mouseup', (e) => {
                    exports.isMousePressed = false;
                });
                fn();
                resolve();
            });
        }
    });

    const drawloop = (fn) => {
        requestAnimationFrame(() => {
            fn();
            drawloop(fn);
        });
    }

    exports.draw = (fn) => {
        onsetup.then(() => {
            drawloop(fn);
        });
    };

    exports.mousePressed = (fn) => {
        window.addEventListener('mousedown', fn);
    };

    exports.mouseMoved = (fn) => {
        window.addEventListener('mousemove', fn);
    };

    exports.background = (r, g = r, b = r, a = 1) => {
        const lastFill = context.fillStyle;
        context.fillStyle = colorString(r, g, b, a);
        context.fillRect(0, 0, width, height);
        context.fillStyle = lastFill;
    };

    exports.println = (...args) => console.log(args);
    exports.random = (minimum, maximum) => {
        const min = !maximum ? 0 : minimum;
        const max = maximum || minimum;
        return ((max - min) * Math.random()) + min;
    };

    exports.PI = Math.PI;
    exports.TWO_PI = Math.PI * 2;

    exports.ellipse = (x, y, w, h) => {
        context.beginPath();
        context.ellipse(x, y, Math.floor(w / 2), Math.floor(h / 2), 0, 0, exports.TWO_PI);
        context.fill();
    };

    const font = {
        family: 'serif',
        size: '12px',
    };

    exports.textSize = (size) => {
        font.size = `${size}px`;
        context.font = `${font.size} ${font.family}`;
    };

    exports.text = (str, x, y) => {
        context.fillText(str, x, y);
    }

    exports.mouseX = 0;
    exports.mouseY = 0;
    exports.isMousePressed = false;

}());