import { useCallback } from 'react';
import { throttle } from "lodash";
import { DEFAULT_SAVE_TIME } from "../../includes/constants";

const useThrottle = (
    callback: (...args: any) => any,
    delay = DEFAULT_SAVE_TIME,
    deps: any[],
    options = { trailing: true }
) => {

    // eslint-disable-next-line
    const throttleFn = useCallback(
        throttle(callback, delay, options),
        [delay, ...deps]
    );

    return throttleFn;
};

export default useThrottle;
