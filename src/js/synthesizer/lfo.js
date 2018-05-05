export class LFO {
    constructor(ctx) {
        this.ctx = ctx;
        this.lfo = this.ctx.createOscillator();
        this.lfo.type = 'sine';
        this.lfo.frequency.setValueAtTime(10, this.ctx.currentTime);

        this.lfoGain = this.ctx.createGain();
        this.lfoGain.gain.value = 30;
        this.lfo.connect(this.lfoGain);
        this.lfo.start();
    }

    get outputNode() {
        return this.lfoGain;
    }

    setFrequency(val) {
        this.lfo.frequency.linearRampToValueAtTime(val, this.ctx.currentTime + 0.01);
    }

    setType(val) {
        this.lfo.type = val;
    }

    setGain(val) {
        console.log(this);
        console.log(this.lfoGain);
        this.lfoGain.gain.linearRampToValueAtTime(val, this.ctx.currentTime + 0.01);
    }
}

export default LFO;