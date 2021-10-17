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
	return new Promise((resolve, reject) => {
		axios.get<JokeResponse>('https://v2.jokeapi.dev/joke/' + category)
			.then((response) => {
				const result = response.data
				if(result.error) {
					reject(new Error(result.message, result.additionalInfo))
				}

				switch(result.type) {
				case 'single':
					resolve(new Joke(result.joke))
					break
				case 'twopart':
					resolve(new Joke(result.setup, result.delivery))
					break
				default:
					reject(new Error(`Unkwnown joke type: ${result.type}`, 
						'Looks like the program and its developer are outdated!'))
					break
				}
			}).catch((error) => {
				reject(new Error('Unable to get a joke from the server. Check internet connection', 
					error.message))
			})
	})
}

export async function getJokeAsync(category = 'Any') : Promise<Joke> {
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
