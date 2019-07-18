import React from 'react';
import '../css/itemsWrapper.css';

class ItemsWrapper extends React.Component {
    render() {
        const { label } = this.props;
        const classNewName = `items-wrapper`;
        return (
            <div className={classNewName}>
                <span className="label">{label}</span>
                <div className="inner-items">{this.props.children}</div>
            </div>
        );
    }
}

export default ItemsWrapper;