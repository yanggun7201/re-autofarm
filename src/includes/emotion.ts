import PropTypes from "prop-types";

/**
 * Some emotion (css in js) related utils/constants.
 */

export const extraCss = (extra, theme) => typeof extra === "function" ? extra(theme) : extra;

export const extraCssPropType = PropTypes.oneOfType([PropTypes.object, PropTypes.func]);

export default {
    extraCss,
    extraCssPropType,
};
