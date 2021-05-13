/**
 * Retrieve an item from local storage.  Call function based on decode option.
 *
 * @param key
 * @param value
 * @param decode
 *
 * @return {*}
 */
export const retrieve = (key: any, value: any = '', decode: any = true) => {
    if (storageExists()) {
        return decode ? retrieveObject(key, value) : retrieveValue(key);
    }
};

/**
 * Retrieve a json encoded item from local storage.
 *
 * @param key
 * @param value
 *
 * @return {*}
 */
export const retrieveObject = (key: any, value: any = '') => {
    let ls = null;
    if (storageExists()) {
        try {
            let item: any = global.localStorage.getItem(key);

            ls = JSON.parse(item) || {};
        } catch (e) {
            /*Ignore*/
        }
    }

    // if we want a nested value, check for the value
    if (value) {
        return ls && ls.hasOwnProperty(value) ? ls[value] : null;
    }

    return ls;
};

/**
 * Retrieve a raw value from local storage.
 *
 * @param key
 *
 * @return {*}
 */
export const retrieveValue = (key: any) => {
    if (storageExists()) {
        return global.localStorage.getItem(key);
    }
};

/**
 * Persists an item to local storage.  Call function based on encode option.
 *
 * @param key
 * @param value
 * @param encode
 *
 * @returns {*}
 */
export const persist = (key: any, value: any, encode: any = true) => {
    if (storageExists()) {
        encode ? persistObject(key, value) : persistValue(key, value);
    }
};

/**
 * Persists an item as a stringified value to local storage.
 *
 * @param key
 * @param value
 *
 * @returns {*}
 */
export const persistObject = (key: any, value: any) => {
    if (storageExists()) {
        global.localStorage.setItem(key, JSON.stringify(value));
    }
};

/**
 * Persists a raw value in local storage.
 *
 * @param key
 * @param value
 *
 * @returns {*}
 */
export const persistValue = (key: any, value: any) => {
    if (storageExists()) {
        global.localStorage.setItem(key, value);
    }
};

/**
 * Remove an item from local storage.
 *
 * @param key
 */
export const removeItem = (key: any) => {
    if (storageExists()) {
        global.localStorage.removeItem(key);
    }
};


/**
 * Check if localStorage is available.
 *
 * @returns {boolean}
 */
export const storageExists = () => !!global.localStorage;
