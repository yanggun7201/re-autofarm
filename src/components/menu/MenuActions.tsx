import React, { useCallback, useMemo } from "react";
import { css, useTheme } from "@emotion/react";
import { Theme } from "../../theme";
import { ReactComponent as DarkModeIcon } from "../../images/dark-mode-icon.svg";
import { ReactComponent as LightModeIcon } from "../../images/light-mode-icon.svg";
import Container from "../layouts/Container";
import { NOOP } from "../../constants";
import OutlineButton from "../buttons/OutlineButton";
import CommonLink from "../links/CommonLink";
import BlackGrayText from "../text/BlackGrayText";
import { useConnectWalletContext } from "../../core/contexts/ConnectWalletContext";
import { ReactComponent as WalletIcon } from "../../images/wallet-icon.svg";

type Props = {
    toggleTheme: () => void,
    priceAUTO?: string,
};

const outToken = "0xa184088a740c695e156f91f5cc086a06bb78b827";

const MenuActions: React.FC<Props> = ({
    toggleTheme = NOOP,
    priceAUTO = '0'
}) => {
    const theme: Theme = useTheme();
    const { toggleConnectWalletModal, walletIsConnected, disconnectWallet } = useConnectWalletContext();

    const openConnectWalletModal = useCallback(() => {
        toggleConnectWalletModal(true);
    }, [toggleConnectWalletModal]);

    const priceAutoText = useMemo(() => {
        return Number(Number(priceAUTO).toFixed(2)).toLocaleString();
    }, [priceAUTO]);

    return (
        <Container css={style}>
            <Container css={containerStyle}>
                <Container css={modeContainerStyle} onClick={toggleTheme}>
                    <LightModeIcon css={modeIconStyle(theme.isLightMode)} />
                    <div css={nodeSeparateStyle}>/</div>
                    <DarkModeIcon css={modeIconStyle(theme.isDarkMode)} />
                </Container>

                <Container css={toggleCoinCompanyStyle}>
                    <div css={coinNameStyle(true)}>BSC</div>
                    <div css={coinNameStyle(false)}>HECO</div>
                </Container>

                {walletIsConnected
                    ? (
                        <OutlineButton
                            type={"red"}
                            title={"0xCB4...b7EB"}
                            css={walletButtonStyle}
                            extraTitleCss={walletButtonExtraTitleCss}
                            onClick={disconnectWallet}
                        >
                            <WalletIcon />
                        </OutlineButton>
                    )
                    : (
                        <OutlineButton
                            title={"Wallet"}
                            css={walletButtonStyle}
                            extraTitleCss={walletButtonExtraTitleCss}
                            onClick={openConnectWalletModal}
                        >
                            <WalletIcon />
                        </OutlineButton>
                    )
                }
            </Container>
            <Container css={autoBuyContainerStyle}>
                <BlackGrayText css={blackGrayTextStyle}>AUTO ${priceAutoText}</BlackGrayText>
                <CommonLink href={`/swap/${outToken}`} css={buyButtonStyle}>BUY</CommonLink>
            </Container>
        </Container>
    );
}

const style = (theme: Theme) => css`
    flex-direction: column;
    margin-top: auto;

    ${theme.breakpoints.down("lg")} {
        margin-left: auto;
        margin-top: 0;
    }
`;

const containerStyle = (theme: Theme) => css`
    flex-direction: column;
    justify-content: space-between;
    height: 120px;

    ${theme.breakpoints.down("lg")} {
        flex-direction: row;
        height: auto;
        align-items: center;

        > div {
            margin-right: 12px;
        }
    }

    ${theme.breakpoints.down("xs")} {
        > div {
            margin-right: 8px;
        }
    }
`;

const modeContainerStyle = (theme: Theme) => css`
    align-items: center;
    height: 24px;
    cursor: pointer;

    ${theme.breakpoints.down("xs")} {
        height: 20px;
    }
`;

const modeIconStyle = (isActive: boolean) => (theme: Theme) => css`
    color: ${theme.colours.inActiveMode};
    width: 24px;
    height: 24px;

    ${isActive && css`
        color: ${theme.colours.text};
    `};

    ${theme.breakpoints.down("xs")} {
        width: 18px;
        height: 18px;
    }
`;

const nodeSeparateStyle = (theme: Theme) => css`
    color: ${theme.colours.inActiveMode};
    margin: 0 4px;
`;

const toggleCoinCompanyStyle = (theme: Theme) => css`
    height: 34px;
    padding: 8px;
    border: 1px solid #d1d5da;
    border-radius: 5px;
    justify-content: space-evenly;
    font-weight: bold;

    ${theme.breakpoints.down("lg")} {
        width: 98px;
    }

    ${theme.breakpoints.down("xs")} {
        width: 83px;
        height: 22px;
        padding: 4px;
        font-size: 12px;
        line-height: 15px;
    }
`;

const walletButtonStyle = (theme: Theme) => css`
    width: 100%;
    padding-left: 0;
    padding-right: 0;

    ${theme.breakpoints.down("lg")} {
        //width: 82px;
    }

    ${theme.breakpoints.down("xs")} {
        height: 22px;
        padding: 4px 0;

        > svg {
            width: 12px;
            height: 12px;
        }
    }
`;

const walletButtonExtraTitleCss = (theme: Theme) => css`
    font-weight: bold;

    ${theme.breakpoints.down("xs")} {
        font-size: 12px;
        line-height: 15px;
    }
`;

const coinNameStyle = (isActive: boolean) => (theme: Theme) => css`
    color: #9ca3af; // #6a7380
    cursor: pointer;
    font-weight: bold;

    ${isActive && css`
        color: ${theme.colours.text};
        cursor: default;
    `};

    ${theme.breakpoints.up("xxl")} {
        font-weight: bold;
    }
`;

const autoBuyContainerStyle = (theme: Theme) => css`
    height: 20px;
    padding: 8px 2px;
    font-size: 14px;
    justify-content: space-between;

    ${theme.breakpoints.down("lg")} {
        justify-content: flex-end;
    }

    ${theme.breakpoints.down("xs")} {
        font-size: 12px;
    }
`;

const buyButtonStyle = (theme: Theme) => css`
    font-weight: bold;
    margin-left: 8px;

    ${theme.breakpoints.down("xs")} {
        font-size: 12px;
    }
`;

const blackGrayTextStyle = (theme: Theme) => css`

    ${theme.breakpoints.up("sm")} {
        font-size: 14px;
    }

    ${theme.breakpoints.down("xs")} {
        font-size: 12px;
    }
`;

export default MenuActions;

