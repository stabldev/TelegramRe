import { FormatString } from '$functions/format_string';
import { expect, test } from 'vitest';

test('format date test', () => {
	const formated_string = new FormatString('anya-forger');
	expect(formated_string.add_at_symbol).toBe('@anya-forger');
});
