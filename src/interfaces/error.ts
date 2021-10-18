/**
 * Class with an error information
 * @param message - Main error message.
 * @param additionalInfo - Additional message, that describes reason of the error.
 */
export class Error {
	constructor(readonly message: string, readonly additionalInfo?: string) {}
}