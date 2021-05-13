import React, { useCallback, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import { NOOP } from "../../constants";
import Container from "../layouts/Container";
import { ReactComponent as DropdownArrowIcon } from "../../images/dropdown-arrow-icon.svg";
import {
    DropdownContextValueType,
    useDropdownContext,
} from "./DropdownContext";

type Props = {
    prefix?: DropdownContextValueType,
    value?: DropdownContextValueType,
    onChange?: (selectedValue: DropdownContextValueType) => void,
    className?: string,
    children?: React.ReactNode,
};

const DropdownCore: React.FC<Props> = ({ prefix = "", value = "", onChange = NOOP, className = "", children }) => {
    const { selectedValue, selectedChildren, setSelectedValue } = useDropdownContext();
    const [open, setOpen] = useState<boolean>(false);

    const onClick = useCallback((e: React.MouseEvent) => {
        setOpen(oldValue => !oldValue);
    }, []);

    useEffect(() => {
        onChange(selectedValue);
        setOpen(false);
    }, [selectedValue, onChange]);

    useEffect(() => {
        if (setSelectedValue) {
            setSelectedValue(value);
        }
    }, [value, setSelectedValue]);

    return (
        <Container css={toggleCoinCompanyStyle} className={className} onClick={onClick}>
            <DropdownArrowIcon css={dropdownArrowIconStyle} />
            <div css={selectedValueStyle}>{prefix && `${prefix} `}{selectedChildren}</div>
            <div css={dropdownItemContainerStyle(open)}>
                {children}
            </div>
        </Container>
    );
};

const toggleCoinCompanyStyle = (theme: Theme) => css`
    width: 142px;
    height: 40px;
    padding: 8px;
    font-size: 16px;
    font-weight: 400;
    border: 1px solid ${theme.colours.border};
    border-radius: 5px;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    cursor: pointer;
`;

const dropdownArrowIconStyle = (theme: Theme) => css`
    width: 16px;
    height: 16px;
`;

const dropdownItemContainerStyle = (open: boolean) => (theme: Theme) => css`
    position: absolute;
    top: 100%;
    width: 100%;
    left: 0;
    margin-top: 8px;
    border: 1px solid ${theme.colours.border};
    border-radius: 8px;
    overflow: hidden;
    background-color: ${theme.colours.background};

    ${open
            ? css`
                display: block;
            `
            : css`
                display: none;
            `
    };
`;

const selectedValueStyle = css`
    user-select: none;
`;

export default DropdownCore;