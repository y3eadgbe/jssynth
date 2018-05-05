import ChannelController from './channelController';
import { noteToFrequency } from './frequencyUtil';

export class MonophonicChannelController extends ChannelController {
    constructor(channel) {
        super();
        this.channel = channel;
        this.noteStack = [];
        this._portamentoTime = 0;
    }

    get portamentoTime() {
        return this._portamentoTime;
    }

    set portamentoTime(second) {
        this._portamentoTime = second;
    }

    channelCount() {
        return 1;
    }

    startNote(note) {
        if (this.noteStack.indexOf(note) === -1) {
            console.log("NoteOn: " + note);
            this.noteStack.push(note);
            if (this.channel.isBusy()) {
                console.log(this.portamentoTime);
                this.channel.startNote(noteToFrequency(note), this.portamentoTime);
            } else {
                this.channel.startNote(noteToFrequency(note));
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
                this.channel.startNote(noteToFrequency(this.noteStack[this.noteStack.length - 1]), this.portamentoTime);
            }
        }
    }
}

export default MonophonicChannelController;