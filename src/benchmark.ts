import { getJoke, getJokeAwait } from './lib'

const N = 20

async function callAsync(N: number) {
	const promises = []
	for(let i = 0; i<N; i++) {
		promises.push(getJoke())
	}
	await Promise.all(promises)
	console.log('Async call complete')
}

async function callSync(N: number) {
	for(let i = 0; i<N; i++) {
		await getJokeAwait()
	}
	console.log('Sync call complete')
}

async function main() {
	console.log('Testing sync call')
	let start = performance.now()
	await callSync(N)
	let end = performance.now()
	console.log('Execution time: ' + (end-start)+ ' ms')

	console.log('Testing async call')
	start = performance.now()
	await callAsync(N)
	end = performance.now()
	console.log('Execution time: ' + (end-start) + ' ms')
}

main()
