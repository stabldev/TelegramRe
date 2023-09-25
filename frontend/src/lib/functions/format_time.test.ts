import { FormatDate } from "./format_time";
import { expect, test } from "vitest";

test("format date test", () => {
	const formated_time = new FormatDate("2023-09-24T12:38:51.162Z");
	expect(formated_time.format_to_relative_time).toBe("24 Sept");
});