import React from "react";
import { css, useTheme } from "@emotion/react";
import { Theme } from "../../theme";
import { ReactComponent as WalletIcon } from "../../images/wallet-icon.svg";
import { NOOP } from "../../constants";

type Props = {
    title: string,
    onClick?: () => void,
};

const OutlineButton: React.FC<Props> = ({ title = "", onClick = NOOP }) => (
    <button css={walletButtonStyle} onClick={onClick}>
        <WalletIcon css={walletIconStyle} />
        <div css={walletLabelStyle}>{title}</div>
    </button>
);

const walletButtonStyle = (theme: Theme) => css`
    border: 1px solid #3c81f6;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    padding: 8px;
    border-radius: 5px;
`;

const walletIconStyle = (theme: Theme) => css`
    color: #3c81f6;
    width: 16px;
    height: 16px;
`;

const walletLabelStyle = (theme: Theme) => css`
    font-size: 16px;
    color: #3c81f6;
    font-weight: 400;
    margin-left: 10px;
`;

export default OutlineButton;

