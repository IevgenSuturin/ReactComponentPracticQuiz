import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../Components/FinishedQuiz/FinishedQuiz';
import Loader from '../../Components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quiz extends Component{

    componentDidMount(){
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount(){
        this.props.retryQuiz()
    }

    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer the question</h1>

                    { this.props.loading || !this.props.quiz
                        ? <Loader />
                        :
                        this.props.isFinished
                        ? <FinishedQuiz 
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onReTry = {this.props.retryQuiz}
                          />
                        : <ActiveQuiz
                              answers={this.props.quiz[this.props.activeQuestion].answers}
                              question={this.props.quiz[this.props.activeQuestion].question}
                              quizLength={this.props.quiz.length}
                              activeQuestion={this.props.activeQuestion + 1}
                              state = {this.props.answerState}
                              onAnswerClick = {this.props.quizAnswerClick}
                          />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        results: state.quiz.results, //{[id]: 'success', 'error'}
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState, //{[id]: 'success', 'error'}
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchQuizById: quizId => dispatch(fetchQuizById(quizId)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz : () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)