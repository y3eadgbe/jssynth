import PolyphonicChannelController from './polyphonicChannelController';
import Channel from './channel';
import ADSREnvelope from './configuration/adsrEnvolepe';
import LFO from './lfo';

const NUMBER_OF_CHANNELS = 16;

export class Synthesizer {
    constructor(ctx) {
        this.ctx = ctx;
        this.envelope = new ADSREnvelope();
        this.lfo = new LFO(this.ctx);
        this.mix = ctx.createGain();
        this.channels = new Array(NUMBER_OF_CHANNELS);
        for (let i = 0; i < NUMBER_OF_CHANNELS; i++) {
            this.channels[i] = new Channel(this.ctx, this.envelope, this.lfo);
            this.channels[i].outputNode.connect(this.mix, 0, 0);
        }
        console.log(this.channles);
        this.channelController = new PolyphonicChannelController(this.channels);
        this.channelController.portamentoTime = 0.02;
    }

    get outputNode() {
        return this.mix;
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
        this.channels.map(channel => channel.setPrimaryOscillatorType(val));
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