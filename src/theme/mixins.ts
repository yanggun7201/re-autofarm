import colours from "./colours";
import transitions from './transitions';
import { fonts } from "./fonts";

const mixins = {
    bloop: `
        transition: transform ${transitions.transitionFastest};
        &:hover {
            transform: scale(1.1);
        }
    `,
    bloopScale: `
        transform: scale(1.1);
    `,
    placeholderAttributes: (content?: any) => `
        font-family: ${fonts.frutiger};
        font-weight: ${fonts.weights.light};
        color: ${colours.grey[450]};
        opacity: 1; /** Safari / Firefox **/

        ${content};
    `,

    placeholder: (content?: any) => `
        &::placeholder { /** Chrome **/
            ${mixins.placeholderAttributes(content)};

            /** We put @content after the above include, so that the @content can override **/
            ${content};
        }

        /** This css doesn't work with the list below **/
        &::-webkit-input-placeholder, /** Opera/Safari **/
        &::-moz-placeholder, /** Firefox 19+ **/
        &:-moz-placeholder { /** Firefox 18- **/
            ${mixins.placeholderAttributes(content)};

            /** We put @content after the above include, so that the @content can override **/
            ${content};
        }

        /** IE: This css doesn't work with the list above **/
        &:-ms-input-placeholder {
            ${mixins.placeholderAttributes(content)};

            /** We put @content after the above include, so that the @content can override **/
            ${content};
        }

        /** Edge: This css doesn't work with the list above **/
        &::-ms-input-placeholder {
            ${mixins.placeholderAttributes(content)};

            /** We put @content after the above include, so that the @content can override **/
            ${content};
        }
    `,
    input: (backgroundColor?: string) => `
        input,
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            background-color: ${backgroundColor};
            -webkit-box-shadow: 0 0 0 30px ${backgroundColor} inset;
        }
    `,
};

export default {
    ...mixins,
};
