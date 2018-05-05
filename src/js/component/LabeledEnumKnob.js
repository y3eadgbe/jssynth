import React from 'react';
import { Knob } from 'react-rotary-knob';
import PropTypes from 'prop-types';

export class LabeledEnumKnob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            index: 0,
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        const index = Math.floor(value * this.props.values.length);
        if (index !== this.state.index) {
            this.props.onChange(this.props.values[index].value);
        }
        this.setState({ value, index });
    }

    render() {
        const { values, label } = this.props;
        return <div style={{ display: 'inline-block', padding: '10px' }}>
            <span>{label}</span>
            <Knob
                value={this.state.value}
                min={0}
                max={1}
                onChange={this.onChange}
                unlockDistance={25}
            />
            <span>{values[this.state.index].label}</span>
        </div>;
    }
}

LabeledEnumKnob.propTypes = {
    values: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}

export default LabeledEnumKnob;