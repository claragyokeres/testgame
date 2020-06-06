import React from 'react';

const Brick = props => {
    return (
        <div
            className={props.value !== null
                ? 'game-brick'
                : 'null-brick'}
            role="button"
            onClick={() => props.onClick(props.rowIndex, props.colIndex, props.value, props.rowSize)}>
            {props.value}
        </div>
    )
};

export default Brick;