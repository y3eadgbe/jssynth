import React from 'react';
import { Knob } from 'react-rotary-knob';
import Synthesizer from '../synthesizer/synthesizer';
import KeyboardHandler from '../synthesizer/keyboardHandler';

const CONTROLS = {
    masterVolume: {
        max: 1,
        min: 0,
        default: 0.8,
    }
};

const INITIAL_STATE = {
    masterVolume: CONTROLS.masterVolume.default,
};

export class SynthesizerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.ctx = new AudioContext();
        this.synthesizer = new Synthesizer(this.ctx);
        this.masterGain = this.ctx.createGain();
        this.keyboardHandler = null;

        this.synthesizer.outputNode.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
        this.state = INITIAL_STATE;

        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.changeMasterVolume = this.changeMasterVolume.bind(this);
    }

    keyDownHandler(note) {
        this.synthesizer.startNote(note);
    }

    keyUpHandler(note) {
        this.synthesizer.endNote(note);
    }

    componentDidMount() {
        this.keyboardHandler = new KeyboardHandler(
            this.keyDownHandler,
            this.keyUpHandler
        );
    }

    componentWillUnmount() {
        this.keyboardHandler.close();
        this.keyboardHandler = null;
    }

    changeMasterVolume(val) {
        this.masterGain.gain.exponentialRampToValueAtTime(
            val,
            this.ctx.currentTime + 0.01
        );
        this.setState({ masterVolume: val });
    }

    render() {
        return <div style={{ padding: "30px" }}>
            <Knob
                value={this.state.masterVolume}
                min={CONTROLS.masterVolume.min}
                max={CONTROLS.masterVolume.max}
                onChange={this.changeMasterVolume}
                unlockDistance={25}
            />
            <div>{this.state.masterVolume}</div>
        </div>;
    }
}

export default SynthesizerComponent;