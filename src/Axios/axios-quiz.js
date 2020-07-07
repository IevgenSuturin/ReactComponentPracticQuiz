import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-19d18.firebaseio.com/'
})