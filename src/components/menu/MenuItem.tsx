import React from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import { NavLink } from "react-router-dom";
import { ExtraCssPropType, extraCss } from "../../includes/emotion";

type Props = {
    children: React.ReactNode,
    title: string,
    path: string,
    extraTitleCss?: ExtraCssPropType,
}

const MenuItem: React.FC<Props> = ({
    children,
    title,
    path = "/",
    extraTitleCss = ""
}) => (
    <NavLink to={path} {...path === "/" && { exact: true }} css={style} activeClassName={"active"}>
        {children}
        <div css={titleStyle(extraTitleCss)}>{title}</div>
    </NavLink>
);

const style = (theme: Theme) => css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 8px;
    border-radius: 8px;
    color: ${theme.colours.text};
    text-decoration: none;
    font-weight: bold;
    transition: background-color ${theme.transitions.transition};

    ${theme.breakpoints.up("xl")} {
        :hover {
            background-color: ${theme.colours.menu.hover};
        }

        &.active {
            background-image: linear-gradient(to right, ${theme.colours.menu.linearGradient});
        }
    }

    &.active {
        background-color: ${theme.colours.menu.active};

        div {
            color: ${theme.colours.text};
        }
    }
`;

const titleStyle = (extraTitleCss: ExtraCssPropType) => (theme: Theme) => css`
    margin-left: 7px;

    ${theme.breakpoints.up("xxl")} {
        font-size: 17px;
        line-height: 18px;
        height: 17px;
    }

    ${theme.breakpoints.down("lg")} {
        font-size: 16px;
        line-height: 19px;
        height: 16px;
        color: ${theme.colours.blackGrayText};
    }

    ${extraCss(extraTitleCss, theme)};
`;

export default MenuItem;

