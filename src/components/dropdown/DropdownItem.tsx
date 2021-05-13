import React, { useCallback, useEffect } from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import { DropdownContextValueType, useDropdownContext } from "./DropdownContext";

type Props = {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string,
    value?: DropdownContextValueType,
};

const DropdownItem: React.FC<Props> = ({ value, children }) => {
    const { selectedValue, setSelectedValue, setSelectedChildren } = useDropdownContext();

    const onClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (setSelectedValue) {
            setSelectedValue(value);
        }

        if (setSelectedChildren) {
            setSelectedChildren(children);
        }
    }, [value, children, setSelectedValue, setSelectedChildren]);

    useEffect(() => {
        if (selectedValue === value) {
            if (setSelectedChildren) {
                setSelectedChildren(children);
            }
        }
    }, [value, selectedValue, children, setSelectedChildren]);

    return (
        <div css={dropdownItemStyle(selectedValue === value)} onClick={onClick}>{children}</div>
    );
};

const dropdownItemStyle = (active: boolean) => (theme: Theme) => css`
    height: 37px;
    padding: 8px 8px 8px 12px;
    cursor: pointer;
    transition: background-color ${theme.transitions.transition};

    &:not(:first-of-type) {
        border-top: 1px solid ${theme.colours.border};
    }

    &:hover {
        background-color: ${theme.colours.dropdown.hover};
        color: ${theme.colours.text};
    }

    ${active && css`
        background-color: ${theme.colours.dropdown.activeBackground};
        color: ${theme.colours.dropdown.activeColor};

        &:hover {
            background-color: ${theme.colours.dropdown.activeBackground};
            color: ${theme.colours.dropdown.activeColor};
        }
    `};
`;

export default DropdownItem;