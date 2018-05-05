import ADSRAmplifier from './adsrAmplifier';

export class Channel {
    constructor(ctx) {
        this.ctx = ctx;
        this.oscillator = ctx.createOscillator();
        this.oscillator.type = 'square';
        this.amplifier = new ADSRAmplifier(ctx);

        this.oscillator.connect(this.amplifier.inputNode);
        this.oscillator.start();
    }

    get outputNode() {
        return this.amplifier.outputNode;
    }

    isBusy() {
        return this.amplifier.getGain() > 0;
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
}

export default Channel;