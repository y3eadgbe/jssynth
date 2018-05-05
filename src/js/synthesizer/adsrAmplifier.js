export class ADSRAmplifier {
    constructor(ctx) {
        this.ctx = ctx;
        this.amplifier = ctx.createGain();
        this.amplifier.gain.value = 0;
        this.attack = 0.05;
        this.decay = 0.3;
        this.sustain = 0.5;
        this.release = 0.3;
    }

    get inputNode() {
        return this.amplifier;
    }
    
    get outputNode() {
        return this.amplifier;
    }

    getGain() {
        return this.amplifier.gain.value;
    }

    startNote() {
        console.log("amp startNote:" + this.ctx.currentTime);
        console.log(this.amplifier.gain);
        console.log(this.ctx.currentTime + this.attack + ", " + (this.ctx.currentTime + this.attack + this.decay));
        this.amplifier.gain.cancelAndHoldAtTime(this.ctx.currentTime);
        this.amplifier.gain.setValueAtTime(this.amplifier.gain.value, this.ctx.currentTime);
        this.amplifier.gain.linearRampToValueAtTime(1, this.ctx.currentTime + this.attack);
        this.amplifier.gain.linearRampToValueAtTime(this.sustain, this.ctx.currentTime + this.attack + this.decay);
    }

    endNote() {
        console.log("amp endNote:" + this.ctx.currentTime);
        console.log(this.ctx.currentTime + this.release);
        this.amplifier.gain.cancelAndHoldAtTime(this.ctx.currentTime);
        this.amplifier.gain.setValueAtTime(this.amplifier.gain.value, this.ctx.currentTime);
        this.amplifier.gain.linearRampToValueAtTime(0, this.ctx.currentTime + this.release);
    }
}

export default ADSRAmplifier;