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

const TertiaryButton: React.FC<Props> = ({
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
    background-color: ${theme.colours.button.tertiary};
    border: 1px solid ${theme.colours.button.tertiary};
    color: ${theme.colours.text};

    ${fullWidth && css`
        width: 100%;
    `};

    ${disabled
            ? css`
                border: 1px solid ${theme.colours.button.tertiary};
                background-color: ${theme.colours.button.tertiary};
            `
            : css`
                cursor: pointer;

                :hover {
                    background-color: ${theme.colours.linkButton.hover};
                }
            `
    };
`;

export default TertiaryButton;

