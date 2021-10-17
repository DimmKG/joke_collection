import { Error, getJokeAwait, getJoke } from './app'

const promise = getJoke('Programming,Dark').then((joke) => {
	console.log(joke.firstLine)
	if(joke.secondLine) {
		console.log(joke.secondLine)
	}
})

promise.catch((error : Error) => {
	console.error('Error: ' + error.message)
	if(error.additionalInfo) { 
		console.error(error.additionalInfo)
	}
})