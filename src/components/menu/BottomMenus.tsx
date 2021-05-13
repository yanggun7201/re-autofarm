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

const Menus: React.FC<Props> = ({ className = "" }) => (
    <div css={style} className={className}>
        <MenuItem title={"Vaults"} path={"/"}>
            <VaultsIcon css={iconStyle} />
        </MenuItem>
        <MenuItem title={"Swap"} path={"/swap"}>
            <SwapIcon css={iconStyle} />
        </MenuItem>
        <MenuItem title={"Dashboard"} path={"/dashboard"}>
            <DashboardIcon css={iconStyle} />
        </MenuItem>
    </div>
);

const style = (theme: Theme) => css`
    display: flex;
    flex-direction: column;

    > a {
        margin: 8px -8px 0;
        width: 159px;

        ${theme.breakpoints.up("xxl")} {
            width: 175px;
        }

        ${theme.breakpoints.down("lg")} {
            margin: 0;
            width: 118px;
        }
    }

    > a:first-of-type {
        margin-top: 0;
    }
`;

const iconStyle = (theme: Theme) => css`
    width: 20px;
    height: 20px;

    ${theme.breakpoints.up("xxl")} {
        width: 24px;
        height: 24px;
    }

    ${theme.breakpoints.down("lg")} {
        width: 16px;
        height: 16px;
    }
`;

export default Menus;

