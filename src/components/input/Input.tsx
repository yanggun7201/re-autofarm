import React from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import { NOOP } from "../../constants";

type Props = {
    children?: React.ReactNode,
    value?: string,
    placeholder?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string,
};

const Input: React.FC<Props> = ({ children, className = "", value = "", placeholder="", onChange = NOOP }) => (
    <div css={containerStyle} className={className}>
        <div css={iconStyle}>{children}</div>
        <input css={inputStyle} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
);

const containerStyle = (theme: Theme) => css`
    flex: 1 auto;
    display: flex;
    position: relative;
    height: 42px;
    align-items: center;
    padding: 0;
    margin: 0;
    border-radius: 6px;
    width: 100%;
`;

const iconStyle = (theme: Theme) => css`
    margin: 0 10px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const inputStyle = (theme: Theme) => css`
    border: 1px solid ${theme.colours.border};
    background-color: ${theme.colours.background};
    width: 100%;
    height: calc(100% - 2px);
    font-size: 16px;
    padding-left: 36px;
    border-radius: 6px;
    transition: box-shadow ${theme.transitions.transition};

    :focus,
    :active {
        outline: none;
        box-shadow: rgb(255, 255, 255) 0 0 0 0, rgba(59, 130, 246, 0.5) 0 0 0 3px, rgba(0, 0, 0, 0) 0 0 0 0;
    }

    ${theme.mixins.placeholder()};
`;

export default Input;

