import { useCallback } from 'react';
import { throttle } from "lodash";
import { DEFAULT_SAVE_TIME } from "core/constants";

const useThrottle = (
    callback,
    delay = DEFAULT_SAVE_TIME,
    deps,
    options = { trailing: true }
) => {

    const throttleFn = useCallback(
        throttle(callback, delay, options),
        [delay, ...deps]
    );

    return throttleFn;
};

export default useThrottle;
