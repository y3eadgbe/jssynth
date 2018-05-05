export class ADSRAmplifier {
    constructor(ctx, envelope) {
        console.log(envelope);
        this._ctx = ctx;
        this._envelope = envelope;
        this._amplifier = ctx.createGain();
        this._amplifier.gain.value = 0;
    }

    get inputNode() {
        return this._amplifier;
    }
    
    get outputNode() {
        return this._amplifier;
    }

    get gain() {
        return this._amplifier.gain.value;
    }
    
    get envelope() {
        return this._envelope;
    }

    startNote() {
        this._amplifier.gain.cancelAndHoldAtTime(this._ctx.currentTime);
        this._amplifier.gain.setValueAtTime(this._amplifier.gain.value, this._ctx.currentTime);
        this._amplifier.gain.linearRampToValueAtTime(1, this._ctx.currentTime + this.envelope.attack);
        this._amplifier.gain.linearRampToValueAtTime(this.envelope.sustain, this._ctx.currentTime + this.envelope.attack + this.envelope.decay);
    }

    endNote() {
        this._amplifier.gain.cancelAndHoldAtTime(this._ctx.currentTime);
        this._amplifier.gain.setValueAtTime(this._amplifier.gain.value, this._ctx.currentTime);
        this._amplifier.gain.linearRampToValueAtTime(0, this._ctx.currentTime + this.envelope.release);
    }


}

export default ADSRAmplifier;