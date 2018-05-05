export class ADSREnvelope {
    constructor() {
        this._attack = 0.05;
        this._decay = 0.3;
        this._sustain = 0.5;
        this._release = 0.3;
    }

    get attack() {
        return this._attack;
    }

    set attack(val) {
        this._attack = val;
    }

    get decay() {
        return this._decay;
    }

    set decay(val) {
        this._decay = val;
    }

    get sustain() {
        return this._sustain;
    }

    set sustain(val) {
        this._sustain = val;
    }

    get release() {
        return this._release;
    }

    set release(val) {
        this._release = val;
    }
}

export default ADSREnvelope;