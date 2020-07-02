import React from 'react';
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key)=>{
        if(props.results[key] === 'success'){
            total++
        }
        return total
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]

                    debugger
                    return (
                        <li key={index}>
                            <strong> {index+1} </strong>.&nbsp;
                            {quizItem.question} 
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                } )}
            </ul>

            <p>Correct {successCount} total {props.quiz.length}</p>
            <div>
                <Button onClick = {props.onReTry} type="primary" >Try Again</Button>
                <Button type="success" >Go to test list</Button>
            </div>
        </div>

    )
}

export default FinishedQuiz;

