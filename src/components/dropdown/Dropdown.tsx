import React from "react";
import { NOOP } from "../../constants";
import { DropdownContextProvider, DropdownContextValueType } from "./DropdownContext";
import DropdownCore from "./DropdownCore";

type Props = {
    prefix?: DropdownContextValueType,
    value?: DropdownContextValueType,
    onChange?: (selectedValue: DropdownContextValueType) => void,
    className?: string,
    children?: React.ReactNode,
};

const Dropdown: React.FC<Props> = ({ prefix = "", value = "", onChange = NOOP, className = "", children }) => {
    return (
        <DropdownContextProvider defaultValue={value}>
            <DropdownCore value={value} prefix={prefix} onChange={onChange} className={className}>
                {children}
            </DropdownCore>
        </DropdownContextProvider>
    );
};

export default Dropdown;