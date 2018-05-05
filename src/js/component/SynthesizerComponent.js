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
        this.context = new AudioContext();
        this.synthesizer = new Synthesizer(this.context);
        this.keyboardHandler = null;

        this.synthesizer.outputNode.connect(this.context.destination);
        this.state = INITIAL_STATE;
    }

    keyDownHandler(note) {
        this.synthesizer.startNote(note);
    }

    keyUpHandler(note) {
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

    changeMasterVolume(val) {
        this.setState({ masterVolume: val });
        this.synthesizer.changeMasterVolume(val);
    }

    render() {
        return <div style={{ padding: "30px" }}>
            <Knob
                value={this.state.masterVolume}
                min={CONTROLS.masterVolume.min}
                max={CONTROLS.masterVolume.max}
                onChange={this.changeMasterVolume.bind(this)}
                unlockDistance={25}
            />
            <div>{this.state.masterVolume}</div>
        </div>;
    }
}

export default SynthesizerComponent;