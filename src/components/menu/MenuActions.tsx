import React from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import MenuItem from "./MenuItem";
import { ReactComponent as VaultsIcon } from "../../images/vaults-icon.svg";
import { ReactComponent as SwapIcon } from "../../images/swap-icon.svg";
import { ReactComponent as DashboardIcon } from "../../images/dashboard-icon.svg";

const Menus: React.FC = () => (
    <div css={style}>
        <MenuItem title={"Vaults"} path={"/"}>
            <VaultsIcon css={iconStyle}/>
        </MenuItem>
        <MenuItem title={"Swap"} path={"/swap"}>
            <SwapIcon css={iconStyle}/>
        </MenuItem>
        <MenuItem title={"Dashboard"} path={"/dashboard"}>
            <DashboardIcon  css={iconStyle}/>
        </MenuItem>
    </div>
);

const style = (theme: Theme) => css`
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    
    > a {
        margin: 8px -8px 0;
        width: 159px;
    }
    
    > a:first-child {
        margin-top: 0;
    }
`;

const iconStyle = (theme: Theme) => css`
    width: 20px;
    height: 20px;
`;

export default Menus;

