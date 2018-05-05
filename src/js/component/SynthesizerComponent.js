import React from 'react';
import LabeledKnob from './LabeledKnob';
import Synthesizer from '../synthesizer/synthesizer';
import KeyboardHandler from '../synthesizer/keyboardHandler';
import LabeledEnumKnob from './LabeledEnumKnob';

const CONTROLS = {
    masterVolume: {
        max: 1,
        min: 0,
        default: 0.8,
    },
    attack: {
        max: 1,
        min: 0.001,
        default: 0.01,
    },
    decay: {
        max: 1,
        min: 0.001,
        default: 0.1,
    },
    sustain: {
        max: 1,
        min: 0,
        default: 0.5,
    },
    release: {
        max: 5,
        min: 0.001,
        default: 0.05,
    },
    lfoFrequency: {
        max: 100,
        min: 0.1,
        default: 10,
    },
    lfoGain: {
        max: 100,
        min: 0,
        default: 0,
    }
};

const INITIAL_STATE = {
    masterVolume: CONTROLS.masterVolume.default,
    attack: CONTROLS.attack.default,
    decay: CONTROLS.decay.default,
    sustain: CONTROLS.sustain.default,
    release: CONTROLS.release.default,
    lfoFrequency: CONTROLS.lfoFrequency.default,
    lfoGain: CONTROLS.lfoGain.default,
};

export class SynthesizerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.ctx = new AudioContext();
        this.synthesizer = new Synthesizer(this.ctx);
        this.masterGain = this.ctx.createGain();
        this.keyboardHandler = null;

        this.synthesizer.outputNode.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);

        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.setMasterVolume = this.setMasterVolume.bind(this);
        this.setAttack = this.setAttack.bind(this);
        this.setDecay = this.setDecay.bind(this);
        this.setSustain = this.setSustain.bind(this);
        this.setRelease = this.setRelease.bind(this);
        this.setLFOFrequency = this.setLFOFrequency.bind(this);
        this.setLFOGain = this.setLFOGain.bind(this);
        this.onPrimaryOscillatorTypeChange = this.onPrimaryOscillatorTypeChange.bind(this);
        this.onLFOOscillatorTypeChange = this.onLFOOscillatorTypeChange.bind(this);
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

        this.setMasterVolume(this.state.masterVolume);
        this.setAttack(this.state.attack);
        this.setDecay(this.state.decay);
        this.setSustain(this.state.sustain);
        this.setRelease(this.state.release);
        this.setLFOFrequency(this.state.lfoFrequency);
        this.setLFOGain(this.state.lfoGain);
    }

    componentWillUnmount() {
        this.keyboardHandler.close();
        this.keyboardHandler = null;
    }

    setMasterVolume(val) {
        this.masterGain.gain.exponentialRampToValueAtTime(
            val,
            this.ctx.currentTime + 0.01
        );
        this.setState({ masterVolume: val });
    }

    setAttack(val) {
        this.synthesizer.setAttack(val);
        this.setState({ attack: val });
    }

    setDecay(val) {
        this.synthesizer.setDecay(val);
        this.setState({ decay: val });
    }

    setSustain(val) {
        this.synthesizer.setSustain(val);
        this.setState({ sustain: val });
    }

    setRelease(val) {
        this.synthesizer.setRelease(val);
        this.setState({ release: val });
    }

    setLFOFrequency(val) {
        this.synthesizer.setLFOFrequency(val);
        this.setState({ lfoFrequency: val });
    }

    setLFOGain(val) {
        this.synthesizer.setLFOGain(val);
        this.setState({ lfoGain: val });
    }

    onPrimaryOscillatorTypeChange(val) {
        this.synthesizer.setPrimaryOscillatorType(val);
    }

    onLFOOscillatorTypeChange(val) {
        this.synthesizer.setLFOOscillatorType(val);
    }

    render() {
        return <div style={{ padding: '30px' }}>
            <LabeledKnob
                value={this.state.masterVolume}
                min={CONTROLS.masterVolume.min}
                max={CONTROLS.masterVolume.max}
                onChange={this.setMasterVolume}
                label={'Gain'}
            />
            <LabeledKnob
                value={this.state.attack}
                min={CONTROLS.attack.min}
                max={CONTROLS.attack.max}
                onChange={this.setAttack}
                label={'Attack'}
            />
            <LabeledKnob
                value={this.state.decay}
                min={CONTROLS.decay.min}
                max={CONTROLS.decay.max}
                onChange={this.setDecay}
                label={'Decay'}
            />
            <LabeledKnob
                value={this.state.sustain}
                min={CONTROLS.sustain.min}
                max={CONTROLS.sustain.max}
                onChange={this.setSustain}
                label={'Sustain'}
            />
            <LabeledKnob
                value={this.state.release}
                min={CONTROLS.release.min}
                max={CONTROLS.release.max}
                onChange={this.setRelease}
                label={'Release'}
            />
            <LabeledEnumKnob
                values={[
                    { value: 'sine', label: 'Sine' },
                    { value: 'triangle', label: 'Triangle' },
                    { value: 'sawtooth', label: 'Saw' },
                    { value: 'square', label: 'square' },
                ]}
                onChange={this.onPrimaryOscillatorTypeChange}
                label={'Osc 1'}
            />
            <LabeledKnob
                value={this.state.lfoGain}
                min={CONTROLS.lfoGain.min}
                max={CONTROLS.lfoGain.max}
                onChange={this.setLFOGain}
                label={'LFO Gain'}
            />
            <LabeledKnob
                value={this.state.lfoFrequency}
                min={CONTROLS.lfoFrequency.min}
                max={CONTROLS.lfoFrequency.max}
                onChange={this.setLFOFrequency}
                label={'LFO Freq'}
            />
            <LabeledEnumKnob
                values={[
                    { value: 'sine', label: 'Sine' },
                    { value: 'triangle', label: 'Triangle' },
                    { value: 'sawtooth', label: 'Saw' },
                    { value: 'square', label: 'square' },
                ]}
                onChange={this.onLFOOscillatorTypeChange}
                label={'LFO Type'}
            />
        </div>;
    }
}

export default SynthesizerComponent;