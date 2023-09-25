export class FormatString {
	#string: string;

	constructor(string: string) {
		this.#string = string;
	}

	public get add_at_symbol(): string {
		return `@${this.#string}`;
	}
}
