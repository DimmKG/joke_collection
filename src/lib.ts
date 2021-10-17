import axios from 'axios'

/**
   * Class with a joke string
   * @param firstLine - Joke string if it is a single line, or setup if it is a two line.
   * @param secondLine - Delivery string for two line jokes. 
   */
export class Joke {
	constructor(readonly firstLine: string, readonly secondLine?: string) {}
}

/**
 * Class with an error information
 * @param message - Main error message.
 * @param additionalInfo - Additional message, that describes reason of the error.
 */
export class Error {
	constructor(readonly message: string, readonly additionalInfo?: string) {}
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

/**
   * Gets a joke from Joke API
   *
   * @param category - Category string. If there are more than one, write them with comma. Case-insensitive
   * @returns The promise with `Joke` object
   * @throws `Error` object
   *
   */
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
		
/**
   * Gets a joke from Joke API (using async/await)
   *
   * @param category - Category string. If there are more than one, write them with comma. Case-insensitive
   * @returns The promise with `Joke` object
   * @throws `Error` object
   *
   */
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
