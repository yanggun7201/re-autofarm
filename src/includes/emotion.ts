import { Theme } from "../theme";

/**
 * Some emotion (css in js) related utils/constants.
 */

export type ExtraCssPropType = string | object | Function;

export const extraCss = (extra: ExtraCssPropType, theme: Theme) => typeof extra === "function" ? extra(theme) : extra;
