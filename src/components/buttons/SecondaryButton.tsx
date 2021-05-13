import React from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import { NOOP } from "../../constants";
import PrimaryButton from "./PrimaryButton";

type Props = {
    children?: React.ReactNode,
    onClick?: () => void | Promise<void>,
    className?: string,
    disabled?: boolean,
    fullWidth?: boolean,
};

const SecondaryButton: React.FC<Props> = ({
    disabled = false,
    children,
    onClick = NOOP,
    className = "",
    fullWidth = false,
}) => (
    <PrimaryButton
        css={style(disabled, fullWidth)}
        className={className}
        onClick={onClick}
        {...disabled && { disabled: true }}
    >
        {children}
    </PrimaryButton>
);

const style = (disabled: boolean, fullWidth: boolean) => (theme: Theme) => css`
    background-color: ${theme.colours.button.secondary};
    border: 1px solid ${theme.colours.button.secondary};
    color: ${theme.colours.link};

    ${fullWidth && css`
        width: 100%;
    `};

    ${disabled
            ? css`
                border: 1px solid ${theme.colours.button.secondary};
                background-color: ${theme.colours.button.secondary};
            `
            : css`
                cursor: pointer;

                :hover {
                    background-color: ${theme.colours.button.hover};
                }
            `
    };
`;

export default SecondaryButton;