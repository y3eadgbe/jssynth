import ADSRAmplifier from './adsrAmplifier';
import { noteToFrequency } from './frequencyUtil';

export class Channel {
    constructor(ctx, envelope, lfo) {
        this.ctx = ctx;
        this.oscillator = this.ctx.createOscillator();
        this.oscillator.type = 'sine';
        this.amplifier = new ADSRAmplifier(ctx, envelope);
        this._isActive = false;
        this._noteNumber = -1;

        this.oscillator.connect(this.amplifier.inputNode);
        lfo.outputNode.connect(this.oscillator.frequency);
        this.oscillator.start();
    }

    get outputNode() {
        return this.amplifier.outputNode;
    }

    get isActive() {
        return this._isActive;
    }

    get noteNumber() {
        return this._noteNumber;
    }

    isBusy() {
        return this.amplifier.gain > 0;
    }

    startNote(note, time) {
        this._isActive = true;
        if (time) {
            this.oscillator.frequency.linearRampToValueAtTime(noteToFrequency(note), this.ctx.currentTime + time);
        } else {
            this.oscillator.frequency.setValueAtTime(noteToFrequency(note), this.ctx.currentTime);
        }
        this._noteNumber = note;
        this.amplifier.startNote();
    }

    endNote() {
        this._isActive = false;
        this._noteNumber = -1;
        this.amplifier.endNote();
    }

    setPrimaryOscillatorType(val) {
        this.oscillator.type = val;
    }
}

export default Channel;