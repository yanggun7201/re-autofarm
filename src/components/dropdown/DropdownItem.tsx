import React from "react";
import { css, useTheme } from "@emotion/react";
import { Theme } from "../../theme";
import { NOOP } from "../../constants";
import Container from "../layouts/Container";
import { ReactComponent as DropdownArrowIcon } from "../../images/dropdown-arrow-icon.svg";

type Props = {
    title: string,
    onClick?: () => void,
    className?: string,
};

const Dropdown: React.FC<Props> = ({ title = "", onClick = NOOP, className = "" }) => {
    return (
        <Container css={toggleCoinCompanyStyle}>
            <DropdownArrowIcon css={dropdownArrowIconStyle} />
            <div>Farm:&nbsp;All</div>
            <div css={dropdownItemContainerStyle}>
                <div css={dropdownItemStyle(true)}>All</div>
                <div css={dropdownItemStyle(false)}>AUTO</div>
                <div css={dropdownItemStyle(false)}>ApeSwap</div>
                <div css={dropdownItemStyle(false)}>BZX</div>
                <div css={dropdownItemStyle(false)}>Bakery</div>
                <div css={dropdownItemStyle(false)}>Belt</div>
                <div css={dropdownItemStyle(false)}>Goose</div>
                <div css={dropdownItemStyle(false)}>Kebab</div>
                <div css={dropdownItemStyle(false)}>MDEX</div>
                <div css={dropdownItemStyle(false)}>PCS</div>
                <div css={dropdownItemStyle(false)}>PCSv2</div>
                <div css={dropdownItemStyle(false)}>Venus</div>
                <div css={dropdownItemStyle(false)}>bDollar</div>
            </div>
        </Container>
    );
};

const toggleCoinCompanyStyle = (theme: Theme) => css`
    width: 142px;
    height: 24px;
    padding: 8px;
    font-size: 16px;
    font-weight: 400;
    border: 1px solid #d1d5da;
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

const dropdownItemContainerStyle = (theme: Theme) => css`
    position: absolute;
    top: 100%;
    width: 100%;
    left: 0;
    margin-top: 8px;
    border: 1px solid #d1d5da;
    border-radius: 8px;
    overflow: hidden;
`;

const dropdownItemStyle = (active: boolean) => (theme: Theme) => css`
    height: 20px;
    padding: 8px 8px 8px 12px;
    cursor: pointer;
    transition: background-color ${theme.transitions.transition};

    &:not(:first-of-type) {
        border-top: 1px solid #d1d5da;
    }

    &:hover {
        background-color: #e4e7eb;
    }

    ${active && css`
        background-color: #374251;
        color: white;

        &:hover {
            background-color: #374251;
            color: white;
        }
    `};
`;

export default Dropdown;