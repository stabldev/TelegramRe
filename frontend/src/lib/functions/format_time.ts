export class FormatDate {
	#date: Date;

	constructor(date: string) {
		this.#date = new Date(date);
	};

	public get format_to_relative_time(): string {
		const current_date = new Date();
		/**
		 * Check if date is today
		 * if yes: return in format like "8:20 AM"
		 * if not: retusn in foramt like "24 SEPT"
		 * */

		 if (
		 	this.#date.getDate() === current_date.getDate() &&
		 	this.#date.getMonth() === current_date.getMonth() &&
		 	this.#date.getFullYear() === current_date.getFullYear()
		 ) {
		 	return this.#date.toLocaleTimeString([], {
		 		hour: "numeric",
		 		minute: "numeric",
		 		hour12: true
		 	});
		 } else {
		 	return this.#date.toLocaleDateString([], {
		 		month: "short",
		 		day: "numeric"
		 	});
		 };
	};
};