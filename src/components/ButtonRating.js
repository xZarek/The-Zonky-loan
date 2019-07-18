import React from 'react';
import '../css/buttonRating.css';

class ButtonRating extends React.Component {
    render() {
        const { label, value, addClass, click } = this.props;
        const classNewName = `button-loan ${addClass}`;
        return (
            <button className={classNewName} value={value} onClick={() => click(value)}>
                {label}%
            </button>
        );
    }
}

export default ButtonRating;