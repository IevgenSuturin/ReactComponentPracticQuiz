import { FETCH_QUIZZES_START, 
         FETCH_QUIZZES_SUCCESS, 
         FETCH_QUIZZES_ERROR, 
         FETCH_QUIZ_SUCCESS, 
         QUIZ_SET_STATE, 
         FINISH_QUIZ,
         QUIZ_NEXT_QUESTION,
         QUIZ_RETRY} from "../actions/actionTypes"

const initialState = {
    quizzes: [],
    leading: false,
    error: null,
    results: {}, //{[id]: 'success', 'error'}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, //{[id]: 'success', 'error'}
    quiz: null
}

export default function quizReducer(state=initialState, action){
    switch (action.type){ 
        case FETCH_QUIZZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZZES_SUCCESS:
            return {
                ...state, loading: false, quizzes: action.quizzes
            }
        case FETCH_QUIZZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            }
        case QUIZ_SET_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            }
        case FINISH_QUIZ:
            return {
                ...state, isFinished: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, activeQuestion: action.number, answerState: null
            }
        case QUIZ_RETRY:
            return {
                ...state, activeQuestion: 0, answerState: null, isFinished: false, results: {}
    
            }
        default:
            return state
    }
}