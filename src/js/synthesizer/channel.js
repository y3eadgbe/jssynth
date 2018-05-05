import ADSRAmplifier from './adsrAmplifier';

export class Channel {
    constructor(ctx, envelope, lfo) {
        this.ctx = ctx;
        this.oscillator = this.ctx.createOscillator();
        this.oscillator.type = 'sine';
        this.amplifier = new ADSRAmplifier(ctx, envelope);

        this.oscillator.connect(this.amplifier.inputNode);
        lfo.outputNode.connect(this.oscillator.frequency);
        this.oscillator.start();
    }

    get outputNode() {
        return this.amplifier.outputNode;
    }

    isBusy() {
        return this.amplifier.gain > 0;
    }

    startNote(freq, time) {
        if (time) {
            this.oscillator.frequency.linearRampToValueAtTime(freq, this.ctx.currentTime + time);
        } else {
            this.oscillator.frequency.setValueAtTime(freq, this.ctx.currentTime);
        }
        this.amplifier.startNote();
    }

    endNote() {
        this.amplifier.endNote();
    }

    setPrimaryOscillatorType(val) {
        this.oscillator.type = val;
    }
}

export default Channel;