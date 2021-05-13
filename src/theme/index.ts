import breakpoints from "./breakpoints";
import colours from './colours';
import { fonts, fontImports } from './fonts';
import forms from './forms';
import popover from "./popover";
import sizes from './sizes';
import utils from './utils';
import borderAndShadow from "./borderAndShadow";
import zIndex from './zIndex';
import transform from "./transform";
import transitions from "./transitions";
import keyframes from "./keyframes";
import mixins from "./mixins";
import tippy from "./tippy";

const theme = {
    breakpoints,
    colours,
    fonts,
    fontImports,
    forms,
    popover,
    sizes,
    utils,
    borderAndShadow,
    zIndex,
    transform,
    transitions,
    mixins,
    tippy,
    keyframes,
};

export type Theme = typeof theme;

export default theme;
