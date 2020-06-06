import React from 'react';

const ShuffleButton = props => {
    return (
        <button
            className="shuffle-button"
            type="button"
            onClick={() => props.onClick()}>
            Shuffle
        </button>
    )
}

export default ShuffleButton;