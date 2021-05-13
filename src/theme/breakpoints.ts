const breakpoints = {
    sizes: {
        'xxs': 0,
        'xs': 368,
        'sm': 640,
        'md': 768,
        'lg': 1024,
        'xl': 1280,
        'xxl': 1440,
        '3xl': 1600,
        '4xl': 1900,
        '5xl': 2200,
    },
    order: [
        'xxs',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'xxl',
        '3xl',
        '4xl',
        '5xl'
    ],
    breakpointsToScale: [
        '3xl',
        '4xl',
        '5xl',
    ],
    scale: {
        '3xl': 1.1,
        '4xl': 1.18,
        '5xl': 1.26
    }
};

type BreakpointSize = keyof typeof breakpoints.sizes;
type ScaleSize = keyof typeof breakpoints.scale;

export const getNextBreakpoint = (size: string) => breakpoints.order[breakpoints.order.indexOf(size) + 1];
const getBreakpointMin = (size: BreakpointSize) => breakpoints.sizes[size];
const getBreakpointMax = (size: string) => breakpoints.sizes[getNextBreakpoint(size) as BreakpointSize] - .02;

/**
 * Returns the media query for a single breakpoint.
 *
 * min represents the breakpoint matching the size prop.
 * max represents the next highest breakpoint from the size prop, minus .02.
 *
 * Example use:
 * ${theme.breakpoints.down('lg')} {
 *     height: 100px;
 * }
 * @param size
 * @returns {string}
 */
export const breakpointOnly = (size: BreakpointSize) => {
    const min = getBreakpointMin(size);
    const max = getBreakpointMax(size);
    return `@media (min-width: ${min}px)${max ? ` and (max-width: ${max}px)` : ""}`;
};

/**
 * Returns the media query for a minimum breakpoint.
 *
 * min represents the breakpoint matching the size prop.
 *
 * Example use:
 * ${theme.breakpoints.up('lg')} {
 *     height: 100px;
 * }
 * @param size
 * @returns {string}
 */
export const breakpointUp = (size: BreakpointSize) => `@media (min-width: ${getBreakpointMin(size)}px)`;

/**
 * Returns the media query for a maximum breakpoint.
 *
 * max represents the next highest breakpoint from the size prop, minus .02.
 *
 * Example use:
 * ${theme.breakpoints.down('lg')} {
 *     height: 100px;
 * }
 * @param size
 * @returns {string}
 */
export const breakpointDown = (size: BreakpointSize) => {
    const max = getBreakpointMax(size);
    return max ? `@media (max-width: ${max}px)` : `@media (min-width: 0)`;
};

/**
 * Returns the media query for a variable number of breakpoints.
 *
 * min represents the breakpoint matching the low prop.
 * max represents the breakpoint matching the next highest breakpoint from the high prop, minus .02.
 *
 * Example use:
 * ${theme.breakpoints.between('lg', 'xl')} {
 *     height: 100px;
 * }
 * @param low
 * @param high
 * @returns {string}
 */
export const breakpointBetween = (low: BreakpointSize, high: BreakpointSize) => {
    const min = getBreakpointMin(low);
    const max = getBreakpointMax(high);

    return `@media (min-width: ${min}px) ${max ? ` and (max-width: ${max}px)` : ""}`;
};

/**
 * This method generates bootstrap media queries with the transform, and transform-origin property for breakpoints 3xl
 * and above. It will apply a transform based on the breakpoint scale factor.
 *
 * Example use:
 * ${theme.breakpoints.scaleUp()}
 *
 * @returns {string}
 */
export const scaleUp = () => {
    let media = "";

    //Loop through breakpoints we want to scale.
    breakpoints.breakpointsToScale.forEach( (breakpoint: string, index: number) => {
        //If we aren't on the last breakpoint, load the breakpointOnly function.  Otherwise assume we are the last
        //breakpoint and so use the breakpointUp function.
        const notLastBreakpoint = Object.keys(breakpoints.breakpointsToScale).length > (index + 1);

        media += `
        ${ notLastBreakpoint ? breakpointOnly(breakpoint as ScaleSize) : breakpointUp(breakpoint as ScaleSize)} {
            transform: scale(${breakpoints.scale[breakpoint as ScaleSize]});
            transform-origin: center top;
        }
        `;
    });

    return media;
};

/**
 * This function will take a prop and value, and expand it based on the breakpoint given.
 * @param breakpoint
 * @param prop
 * @param value
 * @param prefixes
 * @param postfixes
 * @returns {string}
 */
const scaleValue = (breakpoint: ScaleSize, prop: string, value: any, prefixes: string = "", postfixes: string = "") => {
    //Split out the inherited value by spaces.
    const values = value.split(' ');

    const scaledValues = [];

    for (const val of values) {
        //Match the numbers and measurement e.g. "74px" = ["74","px"].
        const match = val.match(/[a-zA-Z]+|-?[0-9]+/g);

        //Scale value and rejoin with measurement.
        scaledValues.push((match[0] * breakpoints.scale[breakpoint]) + match[1])
    }

    return `${prop}: ${prefixes} ${scaledValues.join(' ')} ${postfixes};`;
};

/**
 * This function accepts a css property like "height" and its value, and creates bootstrap media queries for
 * breakpoints 3xl and above.  It will multiply the value by the breakpoint scale factor.
 *
 * This method accept parameters (property, size to scale, prefix, postfix)
 *
 * Example use:
 * ${scalePropUp('border', '500px', '', 'solid red')};
 * ${scalePropUp('padding', '5px 4px 3px 5px')};
 *
 * @param prop
 * @param value
 * @param prefixes
 * @param postfixes
 * @returns {string}
 */
export const scalePropUp = (prop: string, value: any, prefixes: string = "", postfixes: string = "") => {
    let media = "";

    //Loop through breakpoints we want to scale.
    breakpoints.breakpointsToScale.forEach( (breakpoint, index) => {

        //If we aren't on the last breakpoint, load the breakpointOnly function.  Otherwise assume we are the last
        //breakpoint and so use the breakpointUp function.
        const notLastBreakpoint = breakpoints.breakpointsToScale.length > (index + 1);

        //Join all scaled values back together.
        media += `
        ${notLastBreakpoint ? breakpointOnly(breakpoint as BreakpointSize) : breakpointUp(breakpoint as BreakpointSize)} {
            ${scaleValue(breakpoint as ScaleSize, prop, value, prefixes, postfixes)}
        }
        `;
    });

    return media;
};


type ScaleUpProp = [string, string, string?, string?];

/**
 * This mixin accepts css properties like "height" and its value and creates bootstrap media queries for breakpoints 3xl
 * and above. It will multiply each value by the breakpoint scaling factor.
 *
 * This method accept 2 dimensional list of (property, size to scale, prefix, postfix).
 *
 * Example use:
 * ${scalePropListUp(
 *     [
 *         ['height', '500px'],
 *         ['width', '500px'],
 *         ['padding', '5px 4px 3px 5px'],
 *         ['border', '500px', '', 'solid red']
 *     ]
 * )};
 * @param list
 * @returns {string}
 */
export const scalePropListUp = (list: ScaleUpProp[]) => {
    let media = "";

    breakpoints.breakpointsToScale.forEach( (breakpoint, index) => {
        let props = "";

        //Loop through each array in the list and create a combined list of scaled values for the given breakpoint
        list.forEach( ([prop, value, prefixes, postfixes]) => {
            props += scaleValue(breakpoint as ScaleSize, prop, value, prefixes, postfixes);
        });

        //If we aren't on the last breakpoint, load the breakpointOnly function.  Otherwise assume we are the last
        //breakpoint and so use the breakpointUp function.
        const notLastBreakpoint = breakpoints.breakpointsToScale.length > (index + 1);

        //Join all scaled values back together.
        media += `
        ${notLastBreakpoint ? breakpointOnly(breakpoint as ScaleSize) : breakpointUp(breakpoint as ScaleSize)} {
            ${props}
        }
        `;
    });

    return media;
};

export default {
    ...breakpoints,
    only: breakpointOnly,
    between: breakpointBetween,
    up: breakpointUp,
    down: breakpointDown,
    scaleUp,
    scalePropUp,
    scalePropListUp
};
