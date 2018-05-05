import ChannelController from './channelController';

export class MonophonicChannelController extends ChannelController {
    constructor(channel) {
        super();
        this.channel = channel;
        this._channelCount = 1;
        this.noteStack = [];
        this.portamentoTime = 0;
    }

    get channelCount() {
        return this._channelCount;
    }

    startNote(note) {
        if (this.noteStack.indexOf(note) === -1) {
            console.log("NoteOn: " + note);
            this.noteStack.push(note);
            if (this.channel.isBusy()) {
                this.channel.startNote(note, this.portamentoTime);
            } else {
                this.channel.startNote(note);
            }
        }
    }

    endNote(note) {
        const index = this.noteStack.indexOf(note);
        if (index !== -1) {
            this.noteStack.splice(index, 1);
            if (this.noteStack.length === 0) {
                console.log("NoteOff: " + note);
                this.channel.endNote();
            } else if (index == this.noteStack.length) {
                this.channel.startNote(this.noteStack[this.noteStack.length - 1], this.portamentoTime);
            }
        }
    }

    setPortamentoTime(value) {
        this.portamentoTime = value;
    }
}

export default MonophonicChannelController;