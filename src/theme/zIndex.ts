// This is actually not good. We should use named zIndexes such as "zIndexModal", "zIndexNavBar".

export default {
    zIndexMax: 2147483647,
    zIndexHighest: 90000, // Really high to get above z-indexes in external libraries
    zIndexModal: 1101,
    zIndexModalOverlay: 1100,
    zIndexHigher: 400,
    zIndexHigh: 300, // The top nav bar (NavHeader)
    zIndexMediumHigh: 200,
    zIndexMedium: 100,
    zIndexMenuOverlay: 100, // the same as the zIndexMedium
    zIndexLowerThanMenuOverlay: 99, // zIndexMedium - 1
    zIndexThree: 3,
    zIndexTwo: 2,
    zIndexOne: 1,
    zIndexLow: 0,
    zIndexLowest: -100,
};
