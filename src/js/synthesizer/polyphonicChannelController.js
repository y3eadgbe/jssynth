import ChannelController from './channelController';
import { noteToFrequency } from './frequencyUtil';

export class PolyphonicChannelController extends ChannelController {
    constructor(channels) {
        super();
        this.channels = channels;
        this._channelCount = this.channels.length;
        this.noteStack = [];
        this.noteCount = 0;
        this.rotationIndex = 0;
    }

    get channelCount() {
        return this._channelCount;
    }

    startNote(note) {
        if (this.noteStack.indexOf(note) === -1) {
            console.log("NoteOn: " + note);
            let resultIndex = -1;
            if (this.noteCount === this.channelCount) {
                this.channels[this.rotationIndex].startNote(note);
                resultIndex = this.rotationIndex;
                this.rotationIndex = (this.rotationIndex + 1) % this.channelCount;
            } else {
                let releasingChannelIndex = -1;
                let nonBusyChannelIndex = -1;
                for (let i = 0; i < this.channelCount; i++) {
                    const index = (this.rotationIndex + i) % this.channelCount;
                    if (!this.channels[index].isActive && releasingChannelIndex === -1) {
                        releasingChannelIndex = index;
                    }
                    if (!this.channels[index].isBusy && nonBusyChannelIndex === -1) {
                        nonBusyChannelIndex = index;
                    }
                }
                if (nonBusyChannelIndex !== -1) {
                    this.channels[nonBusyChannelIndex].startNote(note);
                    resultIndex = nonBusyChannelIndex;
                    this.rotationIndex = (nonBusyChannelIndex + 1) % this.channelCount;
                } else if (releasingChannelIndex !== -1) {
                    this.channels[releasingChannelIndex].startNote(note);
                    resultIndex = releasingChannelIndex;
                    this.rotationIndex = (releasingChannelIndex + 1) % this.channelCount;
                } else {
                    console.log('This shouldn\'t be happening...');
                }
                this.noteCount++;
            }
            this.noteStack.push(note);
        }
    }

    endNote(note) {
        const index = this.noteStack.indexOf(note);
        if (index !== -1) {
            console.log("NoteOff: " + note);
            this.noteStack.splice(index, 1);
            for (let i = 0; i < this.channelCount; i++) {
                const index = (this.rotationIndex + i) % this.channelCount;
                if (this.channels[index].isActive && this.channels[index].noteNumber === note) {
                    this.channels[index].endNote();
                    this.noteCount--;
                }
            }
        }
    }

    setPortamentoTime(value) {
    }
}

export default PolyphonicChannelController;