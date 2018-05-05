import React from 'react';
import Synthesizer from '../synthesizer/synthesizer';
import KeyboardHandler from '../synthesizer/keyboardHandler';

export class SynthesizerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.context = new AudioContext();
        this.synthesizer = new Synthesizer(this.context);
        this.keyboardHandler = null;

        this.synthesizer.outputNode.connect(this.context.destination);
    }

    keyDownHandler(note) {
        console.log("Down: " + note);
        this.synthesizer.startNote(note);
    }

    keyUpHandler(note) {
        console.log("Up:" + note);
        this.synthesizer.endNote(note);
    }

    componentDidMount() {
        this.keyboardHandler = new KeyboardHandler(
            this.keyDownHandler.bind(this),
            this.keyUpHandler.bind(this)
        );
    }

    componentWillUnmount() {
        this.keyboardHandler.close();
        this.keyboardHandler = null;
    }

    render() {
        return <div>Hello, world!</div>;
    }
}

export default SynthesizerComponent;