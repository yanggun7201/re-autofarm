import React from "react";
import { NOOP } from "../constants";
import { css } from "@emotion/react";
import { Theme } from "../theme";
import Logo from "./Logo";
import Menus from "./menu/Menus";
import MenuActions from "./menu/MenuActions";
import Container from "./layouts/Container";

type Props = {
    toggleTheme: () => void,
    priceAUTO?: string,
};

const Header: React.FC<Props> = ({ toggleTheme = NOOP, priceAUTO = '0' }) => (
    <Container css={style}>
        <Logo css={logoStyle} />
        <div css={barStyle} />
        <Menus css={menusStyle} />
        <div css={emptyBlockStyle}></div>
        <MenuActions toggleTheme={toggleTheme} priceAUTO={priceAUTO} />
    </Container>
);

const style = (theme: Theme) => css`
    display: flex;
    width: 191px;
    min-width: 191px;
    padding: 16px;
    align-items: stretch;
    color: ${theme.colours.text};
    justify-content: stretch;
    flex-direction: column;
    height: 100%;
    max-height: 100%;
    height: calc(100vh - 32px);

    position: sticky;
    top: 0;

    ${theme.breakpoints.up("xxl")} {
        width: 191px;
        min-width: 191px;
    }

    ${theme.breakpoints.down("lg")} {
        flex-direction: row;
        position: relative;
        width: 768px;
        height: 136px;
        padding: 8px 16px;
        margin: 0 auto;
    }

    ${theme.breakpoints.down("md")} {
        width: 100%;
        max-width: 768px;
    }

    ${theme.breakpoints.down("sm")} {
        width: 100%;
        max-width: 100%;
        min-width: 100%;
    }

    ${theme.breakpoints.down("xs")} {
        height: 70px;
    }

`;

const logoStyle = (theme: Theme) => css`
    margin-bottom: 20px;

    ${theme.breakpoints.up("xxl")} {
        margin-bottom: 24px;
    }

    ${theme.breakpoints.down("lg")} {
        height: 32px;
    }

`;

const barStyle = (theme: Theme) => css`
    width: 100%;
    border-right: 1px solid grey;
    margin-top: 24px;

    ${theme.breakpoints.down("lg")} {
        width: 1px;
        height: 100%;
        margin: 0 8px;
    }

    ${theme.breakpoints.down("xs")} {
        display: none;
    }
`;

const emptyBlockStyle = css`
    min-height: 50px;
    height: auto;
`;

const menusStyle = (theme: Theme) => css`

    ${theme.breakpoints.down("xs")} {
        display: none;
    }
`;

export default Header;