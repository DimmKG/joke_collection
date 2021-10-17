import { Command } from 'commander'

import { Error, getJoke } from './lib'

const program = new Command()
program.version('0.5')
program.description('Get a random joke from Joke API "https://v2.jokeapi.dev/"')
program.option('-c, --category [categories...]', 'specify categories. Case-insensitive' )
program.parse(process.argv)

const options = program.opts()
let categories = 'Any'
if (options.category) {
	categories = options.category.join(',', '')
} 

console.error('Getting a joke...\n')
const promise = getJoke(categories).then((joke) => {
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