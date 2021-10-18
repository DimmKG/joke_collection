/**
   * Class with a joke string
   * @param firstLine - Joke string if it is a single line, or setup if it is a two line.
   * @param secondLine - Delivery string for two line jokes. 
   */
export class Joke {
	constructor(readonly firstLine: string, readonly secondLine?: string) {}
}