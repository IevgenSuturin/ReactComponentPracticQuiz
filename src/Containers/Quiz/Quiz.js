import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../Components/FinishedQuiz/FinishedQuiz';
import axios from '../../Axios/axios-quiz';
import Loader from '../../Components/UI/Loader/Loader'

class Quiz extends Component{
    state = {
        results: {}, //{[id]: 'success', 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, //{[id]: 'success', 'error'}
        quiz: [],
        loading: true
    }

    async componentDidMount(){
        console.log(this.props.match.params.id);
        try{
            const response = await axios.get(`quizzes/${this.props.match.params.id}.json`)
            const quiz=response.data;
            this.setState({
                quiz,
                loading: false
            })
        }catch (e){
            console.log(e);
        }
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

                    { this.state.loading 
                        ? <Loader />
                        :
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