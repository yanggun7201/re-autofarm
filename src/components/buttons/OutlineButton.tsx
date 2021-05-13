import React, { useMemo } from "react";
import { css, useTheme } from "@emotion/react";
import { Theme } from "../../theme";
import { NOOP } from "../../constants";
import { extraCss, ExtraCssPropType } from "../../includes/emotion";

type ColorMapType = {
    border: string,
    text: string,
};

type ColorMapsType = {
    [key: string]: ColorMapType,
};

type Props = {
    title: string,
    onClick?: () => void,
    className?: string,
    extraTitleCss?: ExtraCssPropType,
    type?: "red" | "grey" | "default",
    children?: React.ReactNode,
    reverse?: boolean,
};

const OutlineButton: React.FC<Props> = ({
    title = "",
    type = "default",
    onClick = NOOP,
    className = "",
    extraTitleCss = "",
    children,
    reverse = false,
}) => {

    const theme: Theme = useTheme();

    const buttonColorMap: ColorMapsType = useMemo(() => {
        return {
            "default": {
                border: theme.colours.button.border,
                text: theme.colours.link,
            },
            "red": {
                border: theme.colours.button.red,
                text: theme.colours.button.red,
            },
            "grey": {
                border: theme.colours.button.grey,
                text: theme.colours.text,
            },
        };
    }, [theme]);

    const colorMap = buttonColorMap[type];

    return (
        <button css={style(colorMap, reverse, !!onClick)} className={className} onClick={onClick}>
            {!reverse && (
                <div css={iconStyle(colorMap)}>{children}</div>
            )}
            <div css={titleStyle(colorMap, extraTitleCss)}>{title}</div>
            {reverse && (
                <div css={iconStyle(colorMap)}>{children}</div>
            )}
        </button>
    );
}

const style = (colorMap: ColorMapType, reverse: boolean, clickable: boolean) => (theme: Theme) => css`
    border: 1px solid ${colorMap.border};
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    padding: 8px;
    border-radius: 5px;

    > div:first-of-type {
        margin-right: 10px;

        ${theme.breakpoints.down("xs")} {
            margin-right: 4px;
        }
    }

    ${clickable && css`
        cursor: pointer;
    `};
`;

const iconStyle = (colorMap: ColorMapType) => (theme: Theme) => css`
    color: ${colorMap.text};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
`;

const titleStyle = (colorMap: ColorMapType, extraTitleCss: ExtraCssPropType) => (theme: Theme) => css`
    font-size: 16px;
    line-height: 19px;
    height: 100%;
    color: ${colorMap.text};
    font-weight: bold;

    ${extraCss(extraTitleCss, theme)};
`;

export default OutlineButton;

