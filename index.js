const ENTITY_REGEX = /&(?:#(?:([0-9]+)|x([a-fA-F0-9]+))|(amp|apos|quot|lt|gt));/g;
const NAMED_ENTITIES = {
	amp: '&',
	apos: "'",
	quot: '"',
	lt: '<',
	gt: '>',
};

/**
 * Decode numeric entities in text.
 *
 * Decodes numeric (decimal and hexadecimal) entities into their Unicode
 * representation as a string.
 *
 * This is a much more lightweight decoder than is needed for generic HTML
 * handling, as we control the server-side representation.
 *
 * @param {string} text
 * @return {string}
 */
export default function decodeEntities( text ) {
	return text.replace(
		ENTITY_REGEX,
		( _, decimal, hex, named ) => {
			if ( named ) {
				return NAMED_ENTITIES[ named ];
			}

			const codePoint = decimal ? parseInt( decimal, 10 ): parseInt( hex, 16 );
			return codePointToSymbol( codePoint );
		}
	);
}

/**
 * Convert a code point to the Unicode symbol it represents.
 *
 * From https://github.com/mathiasbynens/he
 *
 * @param {Number} codePoint Unicode code point for a symbol
 * @return {string} Symbol represented by the code point
 */
export function codePointToSymbol( codePoint ) {
	let output = '';
	if ( ( codePoint >= 0xD800 && codePoint <= 0xDFFF ) || codePoint > 0x10FFFF ) {
		// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
		// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
		// REPLACEMENT CHARACTER.”
		return '\uFFFD';
	}
	if ( codePoint > 0xFFFF ) {
		codePoint -= 0x10000;
		output += String.fromCharCode( ( ( codePoint >>> 10 ) & 0x3FF ) | 0xD800 );
		codePoint = ( 0xDC00 | codePoint ) & 0x3FF;
	}
	output += String.fromCharCode( codePoint );
	return output;
}
