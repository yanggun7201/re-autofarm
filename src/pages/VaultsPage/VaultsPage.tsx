import React, { useCallback, useMemo } from 'react';
import { css } from "@emotion/react";
import formData from "../../data/FarmData";
import statsData from "../../data/StatsData";
import { Theme } from "../../theme";
import { useConnectWalletContext } from "../../core/contexts/ConnectWalletContext";
import Container from "../../components/layouts/Container";
import OutlineButton from "../../components/buttons/OutlineButton";
import CommonLink from "../../components/links/CommonLink";
import TokenList from "./components/TokenList";
import { ReactComponent as WalletIcon } from "../../images/wallet-icon.svg";
import { ReactComponent as LinkIcon } from "../../images/link-icon.svg";
import NormalText from "../../components/text/NormalText";

const VaultsPage: React.FC = () => {
    const { toggleConnectWalletModal, walletIsConnected, disconnectWallet } = useConnectWalletContext();

    const bscTvlMoney = useMemo(() => {
        return Number(statsData.platformTVL.toFixed(0)).toLocaleString();
    }, []);

    const openConnectWalletModal = useCallback(() => {
        toggleConnectWalletModal(true);
    }, [toggleConnectWalletModal]);

    return (
        <Container css={style}>
            <Container css={leftContainerStyle}>
                <Container css={leftTitleStyle}>
                    <div css={pageTitleStyle}>Vaults</div>
                    <div css={tvlBscContainerStyle}>
                        <div css={tvlContainerStyle}>
                            <div>TVL</div>
                            <div>$1,801,705,282</div>
                        </div>
                        <div css={bscTvlContainerStyle}>BSC TVL ${bscTvlMoney}</div>
                    </div>
                </Container>

                {walletIsConnected
                    ? (
                        <Container css={leftBodyStyle}>
                            <div css={connectMessageStyle}>You're connected to the wrong network</div>

                            <div css={descriptionContainerStyle}>
                                <div css={descriptionTextStyle}>
                                    Please change the network on your wallet to&nbsp;
                                    <NormalText display={"inline"}>BSC</NormalText>.
                                </div>
                                <CommonLink
                                    href={"https://autofarm.gitbook.io/autofarm-network/how-tos/binance-smart-chain-bsc/metamask-add-binance-smart-chain-bsc-network"}
                                    css={tutorialButtonStyle}
                                >
                                    Read our guide for setting up MetaMask <LinkIcon css={linkIconStyle} />
                                </CommonLink>
                            </div>

                            <div css={buttonsContainerStyle}>
                                <OutlineButton
                                    type={"red"}
                                    title={"Disconnect"}
                                    css={walletButtonStyle}
                                    onClick={disconnectWallet}
                                >
                                    <WalletIcon />
                                </OutlineButton>
                                <OutlineButton
                                    reverse
                                    type={"grey"}
                                    title={"Switch to BSC"}
                                    css={walletButtonStyle}
                                    onClick={openConnectWalletModal}
                                >
                                    <img src={"https://docs.metamask.io/metamask-fox.svg"} alt={"MetaMask"}
                                         css={walletImageStyle} />
                                </OutlineButton>
                            </div>
                        </Container>
                    )
                    : (
                        <Container css={leftBodyStyle}>
                            <div css={connectMessageStyle}>Connect your wallet to start using Autofarm</div>

                            <OutlineButton
                                title={"Connect Wallet"}
                                css={walletButtonStyle}
                                onClick={openConnectWalletModal}
                            >
                                <WalletIcon />
                            </OutlineButton>

                            <div css={descriptionContainerStyle}>
                                <div css={descriptionTextStyle}>{`Don't have a wallet setup?`}</div>
                                <CommonLink
                                    href={"https://academy.binance.cc/en/articles/how-to-get-started-with-binance-smart-chain-bsc"}
                                    css={tutorialButtonStyle}
                                >
                                    Get started with Binance Smart Chain <LinkIcon css={linkIconStyle} />
                                </CommonLink>
                            </div>
                        </Container>
                    )
                }
            </Container>

            <Container css={rightContainerStyle}>
                <TokenList tokens={formData.table_data} tokenPools={formData.pools} />
            </Container>
        </Container>
    );
};

const style = (theme: Theme) => css`
    width: 100%;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    display: grid;

    ${theme.breakpoints.down("lg")} {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        width: 768px;
        padding: 8px 16px;
        margin: 0 auto;
    }

    ${theme.breakpoints.down("md")} {
        width: 100%;
        max-width: 768px;
        padding: 0;
    }

    ${theme.breakpoints.down("sm")} {
        width: 100%;
        max-width: 100%;
        min-width: 100%;
    }

`;

const leftContainerStyle = (theme: Theme) => css`
    display: flex;
    position: sticky;
    height: 100vh;
    top: 0;
    padding: 16px 32px;
    flex-direction: column;
    border-left: 1px solid ${theme.colours.border};
    grid-column: span 6/span 6;

    ${theme.breakpoints.between("xl", "xxl")} {
        grid-column: span 5/span 5;
    }

    ${theme.breakpoints.down("lg")} {
        position: relative;
        border: 0;
        height: auto;
        padding: 16px;
        margin: 16px 0 0;
    }
`;

const rightContainerStyle = (theme: Theme) => css`
    border-left: 1px solid ${theme.colours.border};
    grid-column: span 6/span 6;

    ${theme.breakpoints.between("xl", "xxl")} {
        grid-column: span 7/span 7;
    }

    ${theme.breakpoints.down("lg")} {
        border-left: 0;
    }
`;

const leftTitleStyle = (theme: Theme) => css`
    display: flex;
    height: 56px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;

    ${theme.breakpoints.down("xs")} {
        height: 40px;
    }

`;

const leftBodyStyle = (theme: Theme) => css`
    display: flex;
    height: 100%;
    flex-grow: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    ${theme.breakpoints.down("lg")} {
        position: relative;
        height: auto;
        padding: 16px 0;
        margin-top: 24px;
    }
`;

const pageTitleStyle = (theme: Theme) => css`
    font-size: 48px;
    font-weight: bold;

    ${theme.breakpoints.down("xs")} {
        font-size: 30px;
    }
`;

const tvlBscContainerStyle = (theme: Theme) => css`
    font-weight: bold;

    > div {
        height: 28px;

        ${theme.breakpoints.down("xs")} {
            height: 20px;
        }
    }
`;

const tvlContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;

    ${theme.breakpoints.up("lg")} {
        font-size: 19px;
    }

    ${theme.breakpoints.down("xs")} {
        font-size: 15px;
    }
`;

const bscTvlContainerStyle = (theme: Theme) => css`
    ${theme.breakpoints.up("lg")} {
        font-size: 19px;
        font-weight: bold;
    }
`;

const connectMessageStyle = (theme: Theme) => css`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;

    ${theme.breakpoints.down("xs")} {
        font-size: 16px;
    }
`;

const descriptionContainerStyle = css`
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const descriptionTextStyle = (theme: Theme) => css`
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    color: ${theme.colours.text};
`;

const walletButtonStyle = css`
    margin-bottom: 16px;
`;

const tutorialButtonStyle = css`
    margin-bottom: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
`;

const linkIconStyle = css`
    width: 18px;
    height: 18px;
`;

const buttonsContainerStyle = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    > button:first-of-type {
        margin-right: 8px;
    }
`;

const walletImageStyle = css`
    width: 16px;
    height: 16px;
`;

export default VaultsPage;