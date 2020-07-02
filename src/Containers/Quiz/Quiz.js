import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../Components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component{
    state = {
        results: {}, //{[id]: 'success', 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, //{[id]: 'success', 'error'}
        quiz: [
            {
                id: 1,
                question: 'What is the skies color?',
                rightAnswerId: 2,
                answers: [
                    {text: 'black', id: 1},
                    {text: 'blue', id: 2},
                    {text: 'red', id: 3},
                    {text: 'green', id: 4}
                ]
            },
            {
                id: 2,
                question: 'What year the St. Peterburg was founded?',
                rightAnswerId: 3,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1705', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4}
                ]
            }
        ]
    }

    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    reTryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    onAnswerClickHandler = answerId => {
        if(this.state.answerState){
            //special way to get a key
            const key = Object.keys(this.state.answerState)[0];
            if(this.state.answerState[key] === 'success'){
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if(question.rightAnswerId === answerId){
            if(!results[question.id]){
                results[question.id] = 'success';
            }
            this.setState( {
                answerState: {[answerId]: 'success'},
                results
            }
            );

            const timeOut = window.setTimeout(()=>{
                if(this.isQuizFinished()){
                    this.setState({isFinished: true});
                }else{
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeOut);
            }, 1000);
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState:{[answerId]: 'error'},
                results
            })
        }

    }
  
    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer the question</h1>

                    {
                        this.state.isFinished
                        ? <FinishedQuiz 
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onReTry = {this.reTryHandler}
                          />
                        : <ActiveQuiz
                              answers={this.state.quiz[this.state.activeQuestion].answers}
                              question={this.state.quiz[this.state.activeQuestion].question}
                              quizLength={this.state.quiz.length}
                              activeQuestion={this.state.activeQuestion + 1}
                              state = {this.state.answerState}
                              onAnswerClick = {this.onAnswerClickHandler}
                          />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;