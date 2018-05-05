export class Channel {
    constructor(context) {
        this.context = context;
        this.oscillator = context.createOscillator();
        this.oscillator.type = 'triangle';
        this.amplifier = context.createGain();

        console.log(this.amplifier.gain);
        this.amplifier.gain.value = 0;
        this.oscillator.connect(this.amplifier);
        this.oscillator.start();
    }

    get outputNode() {
        return this.amplifier;
    }

    startNote(freq) {
        console.log(freq);
        this.oscillator.frequency.setValueAtTime(freq, this.context.currentTime);
        this.amplifier.gain.value = 0.3;
    }

    endNote() {
        console.log("OFF");
        this.amplifier.gain.value = 0;
    }
}

export default Channel;