import MonophonicChannelController from './monophonicChannelController';
import Channel from './channel';

export class Synthesizer {
    constructor(context) {
        this.context = context;
        this.channel = new Channel(this.context);
        this.masterGain = this.context.createGain();
        this.channel.outputNode.connect(this.masterGain);
        this.channelController = new MonophonicChannelController(this.channel);
    }

    get outputNode() {
        return this.masterGain;
    }

    startNote(note) {
        this.channelController.startNote(note);
    }

    endNote(note) {
        this.channelController.endNote(note);
    }

    changeMasterVolume(volume) {
        this.masterGain.gain.exponentialRampToValueAtTime(volume, this.context.currentTime + 0.01);
    }
}

export default Synthesizer;