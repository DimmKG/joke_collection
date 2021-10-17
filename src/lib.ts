import axios from 'axios'

export class Error {
	constructor(readonly message: string, readonly additionalInfo?: string) {}
}

export class Joke {
	constructor(readonly firstLine: string, readonly secondLine?: string) {}
}

type JokeResponse  = {
	error: boolean
	type: string
	message: string
	additionalInfo: string
	joke: string
	setup: string
	delivery: string
}


export async function getJoke(category = 'Any') : Promise<Joke> {
	const promise = axios.get<JokeResponse>('https://v2.jokeapi.dev/joke/' + category)

	promise.catch((error) => {
		throw new Error('Unable to get a joke from the server. Check internet connection', 
			error.message)
	})

	return promise.then((response) => {
		const result = response.data
		if(result.error) {
			throw new Error(result.message, result.additionalInfo)
		}

		switch(result.type) {
		case 'single':
			return new Joke(result.joke)
		case 'twopart':
			return new Joke(result.setup, result.delivery)
		default:
			throw new Error(`Unkwnown joke type: ${result.type}`, 
				'Looks like the program and its developer are outdated!')
		}
	})
}
		

export async function getJokeAwait(category = 'Any') : Promise<Joke> {
	const response  = await axios.get<JokeResponse>('https://v2.jokeapi.dev/joke/' + category)
		.catch((error) => {
			throw new Error('Unable to get a joke from the server. Check internet connection', 
				error.message)
		})
	const result = response.data
	if(result.error) {
		throw new Error(result.message, result.additionalInfo)
	}
	switch(result.type) {
	case 'single':
		return new Joke(result.joke)
	case 'twopart':
		return new Joke(result.setup, result.delivery)
	default:
		throw new Error(`Unkwnown joke type: ${result.type}`, 
			'Looks like the program and its developer are outdated!')
	}
}
