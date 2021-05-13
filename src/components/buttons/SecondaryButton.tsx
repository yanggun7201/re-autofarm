import React from "react";
import { css, useTheme } from "@emotion/react";
import { Theme } from "../../theme";
import { ReactComponent as WalletIcon } from "../../images/wallet-icon.svg";
import { NOOP } from "../../constants";

type Props = {
    children?: React.ReactNode,
    onClick?: () => void,
    className?: string,
    disabled?: boolean,
};

const PrimaryButton: React.FC<Props> = ({ disabled = false, children, onClick = NOOP, className = "" }) => (
    <button
        css={style(disabled)}
        className={className}
        onClick={onClick}
        {...disabled && { disabled: true }}
    >
        {children}
    </button>
);

const style = (disabled: boolean) => (theme: Theme) => css`
    border: 1px solid ${theme.colours.button.primary};
    background-color: ${theme.colours.button.primary};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding: 8px;
    border-radius: 5px;
    width: 100%;
    font-size: 16px;
    font-weight: bold;

    ${disabled && css`
        border: 1px solid ${theme.colours.button.disabled};
        background-color: ${theme.colours.button.disabled};
    `};
`;

export default PrimaryButton;

