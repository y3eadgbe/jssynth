import MonophonicChannelController from './monophonicChannelController';
import Channel from './channel';

export class Synthesizer {
    constructor(context) {
        this.context = context;
        this.channel = new Channel(this.context);
        this.channelController = new MonophonicChannelController(this.channel);
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
}

export default Synthesizer;