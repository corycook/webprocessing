(function () {
    const exports = window;
    let canvas = document.querySelector('canvas');
    let context = canvas && canvas.getContext('2d');

    const color = (r, g = r, b = r, a = 1) => {
        const f = v => Math.floor(v);
        return `rgba(${f(r)}, ${f(g)}, ${f(b)}, ${a})`;
    };

    exports.BASELINE = 5;
    exports.BOTTOM = 6;
    exports.CENTER = 0;
    exports.LEFT = 1;
    exports.PI = Math.PI;
    exports.RIGHT = 2;
    exports.TOP = 4;
    exports.TWO_PI = Math.PI * 2;
    
    exports.height = 150;
    exports.isMousePressed = false;
    exports.mouseX = 0;
    exports.mouseY = 0;
    exports.width = 300;

    exports.floor = (n) => Math.floor(n);

    exports.fill = (r, g = r, b = r, a = 1) => {
        context.fillStyle = color(r, g, b, a);
    };

    exports.noFill = () => {
        context.fillStyle = 'transparent';
    };

    exports.stroke = (r, g = r, b = r, a = 1) => {
        context.strokeStyle = color(r, g, b, a);
    };

    exports.noStroke = () => {
        context.strokeStyle = 'transparent';
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
                    exports.mouseX = e.offsetX;
                    exports.mouseY = e.offsetY;
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
        context.fillStyle = color(r, g, b, a);
        context.fillRect(0, 0, width, height);
        context.fillStyle = lastFill;
    };

    exports.println = (...args) => console.log(args);
    exports.random = (minimum, maximum) => {
        const min = !maximum ? 0 : minimum;
        const max = maximum || minimum;
        return ((max - min) * Math.random()) + min;
    };

    exports.ellipse = (x, y, w, h) => {
        context.beginPath();
        context.ellipse(x, y, Math.floor(w / 2), Math.floor(h / 2), 0, 0, exports.TWO_PI);
        context.fill();
        context.stroke();
    };

    exports.arc = (x, y, w, h, startAngle, endAngle) => {
        context.beginPath();
        context.ellipse(x, y, Math.floor(w / 2), Math.floor(h / 2), 0, startAngle, endAngle);
        context.fill();
        context.stroke();
    };

    exports.line = (x1, y1, x2, y2) => {
        const lastFill = context.fillStyle;
        exports.noFill();
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
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
    };

    const TEXT_ALIGNX = {
        [exports.LEFT]: 'left',
        [exports.CENTER]: 'center',
        [exports.RIGHT]: 'right',
    };

    const TEXT_ALIGNY = {
        [exports.TOP]: 'top',
        [exports.CENTER]: 'middle',
        [exports.BASELINE]: 'alphabetic',
        [exports.BOTTOM]: 'bottom',
    };

    exports.textAlign = (alignX, alignY) => {
        context.textAlign = TEXT_ALIGNX[alignX];
        if (alignY !== undefined) {
            context.textBaseline = TEXT_ALIGNY[alignY];
        }
    };

}());