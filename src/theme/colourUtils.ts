/**
 * Convert a hexadecimal integer to a decimal integer.
 *
 * @param {string} hex Hexadecimal integer.
 * @returns {number} Decimal integer.
 */
const hexToInt = (hex: string) => parseInt(parseInt(hex, 16).toString(10));

/**
 * Get an rgba colour from a given 6-digit hex colour and an alpha value (defaults to 1).
 *
 * @param {string} hex 6-digit hex rgb colour.
 * @param {number} alpha Alpha channel value.
 * @returns {string} rgba colour.
 */
const rgba = (hex: string, alpha = 1) => {
    if (!hex || hex.length !== 7) {
        throw Error(`Hex colour must have length of 7, got ${hex}`);
    }

    const rgb = [hex.substring(1, 3), hex.substring(3, 5), hex.substring(5, 7)];

    return `rgba(${hexToInt(rgb[0])}, ${hexToInt(rgb[1])}, ${hexToInt(rgb[2])}, ${alpha})`;
};

const utils = {
    hexToInt,
    rgba,
};


export default {
    ...utils,
};
