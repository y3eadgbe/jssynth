import React from 'react';
import { Knob } from 'react-rotary-knob';
import PropTypes from 'prop-types';

export class LabeledKnob extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {value, min, max, onChange} = this.props;
        return <div style={{ display: 'inline-block', padding: '10px' }}>
            <span>{this.props.label}</span>
            <Knob
                value={value}
                min={min}
                max={max}
                onChange={onChange}
                unlockDistance={25}
            />
            <span>{value.toFixed(3)}</span>
        </div>;
    }
}

LabeledKnob.propTypes = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}

export default LabeledKnob;