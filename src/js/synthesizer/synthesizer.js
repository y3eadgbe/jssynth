import MonophonicChannelController from './monophonicChannelController';
import Channel from './channel';

export class Synthesizer {
    constructor(ctx) {
        this.ctx = ctx;
        this.channel = new Channel(this.ctx);
        this.channelController = new MonophonicChannelController(this.channel);
        this.channelController.portamentoTime = 0.02;
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