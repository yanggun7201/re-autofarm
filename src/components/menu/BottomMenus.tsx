import React from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import MenuItem from "./MenuItem";
import { ReactComponent as VaultsIcon } from "../../images/vaults-icon.svg";
import { ReactComponent as SwapIcon } from "../../images/swap-icon.svg";
import { ReactComponent as DashboardIcon } from "../../images/dashboard-icon.svg";

type Props = {
    className?: string,
};

const BottomMenus: React.FC<Props> = ({ className = "" }) => (
    <div css={style} className={className}>
        <MenuItem title={"Vaults"} path={"/"} extraTitleCss={extraTitleCss}>
            <VaultsIcon css={iconStyle} />
        </MenuItem>
        <MenuItem title={"Swap"} path={"/swap"} extraTitleCss={extraTitleCss}>
            <SwapIcon css={iconStyle} />
        </MenuItem>
        <MenuItem title={"Dashboard"} path={"/dashboard"} extraTitleCss={extraTitleCss}>
            <DashboardIcon css={iconStyle} />
        </MenuItem>
    </div>
);

const style = (theme: Theme) => css`

    ${theme.breakpoints.up("sm")} {
        display: none;
    }

    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: ${theme.colours.box.background};

    border-top: 1px solid ${theme.colours.border};

    ${theme.breakpoints.down("sm")} {
        > a {
            background: transparent;
            display: flex;
            flex-direction: column;
            height: 56px;
            padding: 8px;

            &.active {
                background-color: transparent;
                background-image: none;

                svg {
                    fill: ${theme.colours.text};
                }

                div {
                    color: ${theme.colours.text} !important;
                }
            }
        }
    }
`;

const iconStyle = (theme: Theme) => css`
    width: 20px;
    height: 20px;
    fill: ${theme.colours.defaultText2};
`;

const extraTitleCss = (theme: Theme) => css`
    ${theme.breakpoints.down("sm")} {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        font-size: 13px;
        margin: 0;
        color: ${theme.colours.defaultText2};
    }
`;

export default BottomMenus;

