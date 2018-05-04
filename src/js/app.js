import React from 'react';
import ReactDOM from 'react-dom';
import Synthesizer from './components/Synthesizer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    render() {
        return this.state.show ? <Synthesizer/> : <button onClick={() => this.setState({show: !this.state.show})}>Start</button>;
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));