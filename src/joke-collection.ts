import { Command } from 'commander'
import { exit } from 'process'

import { getJoke } from './lib'
import { Error } from './interfaces/error'

const program = new Command()
program.version('0.5')
program.description('Get a random joke from Joke API "https://v2.jokeapi.dev/"')
program.option('-c, --category [categories...]', 'specify categories. Case-insensitive' )
program.parse(process.argv)
const options = program.opts()

let categories = 'Any'
const availableCats : Array<string> = ['programming', 'misc', 'dark', 'pun', 'spooky', 'christmas']

if (options.category) {	
	if(!Array.isArray(options.category)) {
		console.log(`Available categories: ${availableCats.join(', ')}`)
		exit(1)
	}
	const cats : Array<string> = options.category
	cats.forEach((element) => {
		if(availableCats.indexOf(element.toLowerCase()) === -1 ) {
			console.log(`Invalid category: ${element}`)
			console.log(`Available categories: ${availableCats.join(', ')}`)
			exit(1)
		}
	})
	categories = options.category.join(',')
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