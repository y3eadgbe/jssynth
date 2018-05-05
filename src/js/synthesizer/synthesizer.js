import MonophonicChannelController from './monophonicChannelController';
import Channel from './channel';
import ADSREnvelope from './configuration/adsrEnvolepe';
import LFO from './lfo';

export class Synthesizer {
    constructor(ctx) {
        this.ctx = ctx;
        this.envelope = new ADSREnvelope();
        this.lfo = new LFO(this.ctx);
        this.channel = new Channel(this.ctx, this.envelope, this.lfo);
        this.channelController = new MonophonicChannelController(this.channel);
        this.channelController.portamentoTime = 0.02;
    }

    get outputNode() {
        return this.channel.outputNode;
    }

    startNote(note) {
        this.channelController.startNote(note);
    }

    endNote(note) {
        this.channelController.endNote(note);
    }

    setAttack(val) {
        this.envelope.attack = val;
    }

    setDecay(val) {
        this.envelope.decay = val;
    }

    setSustain(val) {
        this.envelope.sustain = val;
    }

    setRelease(val) {
        this.envelope.release = val;
    }

    setPrimaryOscillatorType(val) {
        this.channel.setPrimaryOscillatorType(val);
    }

    setLFOFrequency(val) {
        this.lfo.setFrequency(val);
    }

    setLFOOscillatorType(val) {
        this.lfo.setType(val);
    }

    setLFOGain(val) {
        this.lfo.setGain(val);
    }
}

export default Synthesizer;