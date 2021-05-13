import breakpoints from "./breakpoints";
import lightColours from './lightColours';
import darkColours from './darkColours';
import colourUtils from "./colourUtils";
import transitions from "./transitions";
import borderAndShadow from "./borderAndShadow";
import zIndex from './zIndex';
import mixins from "./mixins";

const commonTheme = {
    breakpoints,
    utils: colourUtils,
    transitions,
    borderAndShadow,
    zIndex,
    mixins,
}

export const lightTheme = {
    colours: lightColours,
    isLightMode: true,
    isDarkMode: false,
    ...commonTheme,
};

export const darkTheme = {
    colours: darkColours,
    isLightMode: false,
    isDarkMode: true,
    ...commonTheme,
};

export type Theme = typeof darkTheme | typeof lightTheme | any;
