const transitionTimes = {
    transitionSlowerTime: '0.5s',
    transitionTime: '0.3s',
    transitionFasterTime: '0.15s',
    transitionFastestTime: '0.1s',
    metricsTransitionTime: '1.3s',
};

const transitions = {
    transitionSlower: `${transitionTimes.transitionSlowerTime} ease-in-out`,
    transition: `${transitionTimes.transitionTime} ease-in-out`,
    transitionFaster: `${transitionTimes.transitionFasterTime} ease-in-out`,
    transitionFastest: `${transitionTimes.transitionFastestTime} ease-in-out`,
    metricsTransition: `${transitionTimes.metricsTransitionTime} ease-in-out`,
};

const transitionsAll = {
    transitionAllSlower: `all ${transitions.transitionSlower}`,
    transitionAll: `all ${transitions.transition}`,
    transitionAllFaster: `all ${transitions.transitionFaster}`,
};

export default {
    ...transitionTimes,
    ...transitions,
    ...transitionsAll,
};
