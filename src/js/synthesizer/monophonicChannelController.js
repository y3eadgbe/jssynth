import ChannelController from './channelController';
import { noteToFrequency } from './frequencyUtil';

export class MonophonicChannelController extends ChannelController {
    constructor(channel) {
        super();
        this.channel = channel;
        this.noteStack = [];
    }

    get channelCount() {
        return 1;
    }

    startNote(note) {
        console.log("controller start: " + note);
        console.log("noteStack: " + this.noteStack);
        if (this.noteStack.indexOf(note) === -1) {
            this.noteStack.push(note);
            this.channel.startNote(noteToFrequency(note));
        }
    }

    endNote(note) {
        console.log("controller end: " + note);
        const index = this.noteStack.indexOf(note);
        if (index !== -1) {
            this.noteStack.splice(index, 1);
            if (this.noteStack.length == 0) {
                this.channel.endNote();
            } else {
                this.channel.startNote(noteToFrequency(this.noteStack[this.noteStack.length - 1]));
            }
        }
    }
}

export default MonophonicChannelController;