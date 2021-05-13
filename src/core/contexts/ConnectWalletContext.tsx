import React, { createContext, useContext, useMemo, Dispatch, useCallback } from "react";
import useSetState from "../../core/hooks/useSetState";

export type DropdownContextValueType = string | number | undefined | null;

export type DropdownContextType = DropdownStateType & {
    setSelectedValue: Dispatch<DropdownContextValueType> | undefined | null,
    setSelectedChildren: (children: React.ReactNode) => void | undefined | null,
}

const DropdownContext = createContext<DropdownContextType>({
    selectedValue: null,
    selectedChildren: null,
    setSelectedValue: (value: DropdownContextValueType) => {
    },
    setSelectedChildren: (children: React.ReactNode) => {
    },
});

type DropdownStateType = {
    selectedValue?: DropdownContextValueType,
    selectedChildren?: React.ReactNode | undefined,
}

type Props = {
    children?: React.ReactNode,
    defaultValue?: DropdownContextValueType
};

export const DropdownContextProvider = ({ children, defaultValue }: Props) => {
    const [state, setState] = useSetState<DropdownStateType>({ selectedValue: defaultValue });

    const setSelectedValue = useCallback((selectedValue: DropdownContextValueType) => {
        setState({ selectedValue });
    }, [setState]);

    const setSelectedChildren = useCallback((selectedChildren: React.ReactNode) => {
        setState({ selectedChildren });
    }, [setState]);

    const value: DropdownContextType = useMemo(() => {
        return {
            ...state,
            setSelectedValue,
            setSelectedChildren,
        }
    }, [state, setSelectedChildren, setSelectedValue]);

    return (
        <DropdownContext.Provider value={value}>
            {children}
        </DropdownContext.Provider>
    );
};

export const useDropdownContext = () => {
    return useContext<DropdownContextType>(DropdownContext);
};

export const withDropdownContext = (WrappedComponent: React.FC<any> | React.ComponentType<any>) => {
    // eslint-disable-next-line react/display-name
    const wrapper = (originalProps: Props) => (
        <DropdownContextProvider>
            <WrappedComponent {...originalProps} />
        </DropdownContextProvider>
    );

    // Similar to how React.memo works. So that other files can still access the original component.
    wrapper.type = WrappedComponent;
    return wrapper;
};