import React from 'react';
import classes from './AnswerItem.module.css'

const AnswerItem = props => {
    const stateClasses = [classes.AnswerItem];

    if(props.state) {
        stateClasses.push(classes[props.state]);
    }


    return (
        <li className={stateClasses.join(' ')}
            onClick={() => {props.onAnswerClick(props.answer.id)}}
        >
            {props.answer.text}
        </li>
    )
};

export default AnswerItem;