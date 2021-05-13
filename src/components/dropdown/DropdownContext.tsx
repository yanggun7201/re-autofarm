import React, { createContext, useContext, useMemo, useState, Dispatch } from "react";

type ValueType = string | number | undefined | null;

type Props = {
    children?: React.ReactNode,
    defaultValue?: ValueType
};

export type DropdownContextType = {
    selectedValue?: ValueType,
    setSelectedValue: Dispatch<ValueType>,
}

const DropdownContext = createContext<DropdownContextType | null>(null);

export const DropdownContextProvider = ({ children, defaultValue }: Props) => {
    const [selectedValue, setSelectedValue]: [ValueType, Dispatch<ValueType>] = useState<ValueType>(defaultValue);

    const value: DropdownContextType = useMemo(() => {
        return {
            selectedValue,
            setSelectedValue,
        }
    }, [selectedValue]);

    // return (
    //     <DropdownContext.Provider<DropdownContextType> value={ value }>
    //         { children }
    //     </DropdownContext.Provider>
    // );

    return false;
};

export const useDropdownContext = () => {
    return useContext<DropdownContextType | null>(DropdownContext);
};