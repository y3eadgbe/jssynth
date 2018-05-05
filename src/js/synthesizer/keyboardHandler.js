const CODE_TO_NOTE = {
    'KeyZ': 60,
    'KeyS': 61,
    'KeyX': 62,
    'KeyD': 63,
    'KeyC': 64,
    'KeyV': 65,
    'KeyG': 66,
    'KeyB': 67,
    'KeyH': 68,
    'KeyN': 69,
    'KeyJ': 70,
    'KeyM': 71,
    'Comma': 72,
    'KeyQ': 72,
    'Digit2': 73,
    'KeyW': 74,
    'Digit3': 75,
    'KeyE': 76,
    'KeyR': 77,
    'Digit5': 78,
    'KeyT': 79,
    'Digit6': 80,
    'KeyY': 81,
    'Digit7': 82,
    'KeyU': 83,
    'KeyI': 84
}

export class KeyboardHandler {
    constructor(keyDownHandler, keyUpHandler) {
        this.keyDownHandler = keyDownHandler;
        this.keyUpHandler = keyUpHandler;
        this.pressed = new Array(128).fill(false);
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onKeyDown(event) {
        const note = CODE_TO_NOTE[event.code];
        if (note && this.pressed[note] === false) {
            this.pressed[note] = true;
            this.keyDownHandler(note);
        }
    }

    onKeyUp(event) {
        const note = CODE_TO_NOTE[event.code];
        if (note && this.pressed[note] === true) {
            this.pressed[note] = false;
            this.keyUpHandler(note);
        }
    }

    close() {
        window.removeEventListener('keydown', this.onKeyDown);
    }
}

export default KeyboardHandler;