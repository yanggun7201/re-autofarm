import React, { useCallback } from 'react';
import { css, keyframes } from "@emotion/react";
import { Theme } from "../../theme";
import CoinFromToBox from "./components/CoinFromToBox";
import useSetState from "../../core/hooks/useSetState";
import { CoinImageType } from "../../data/CoinImageData";
import { useConnectWalletContext } from "../../core/contexts/ConnectWalletContext";
import TertiaryButton from "../../components/buttons/TertiaryButton";
import { ReactComponent as ArrowDownIcon } from "../../images/arrow-down-icon.svg";
import Container from "../../components/layouts/Container";
import Routing from "./components/Routing";

type DEFAULT_STATE = {
    tolerance: number | string,
    fromSelectedCoin?: CoinImageType | null,
    toSelectedCoin?: CoinImageType | null,
    isSwapClicked: boolean,
};

const DEFAULT_APP_STATE = {
    tolerance: "",
    fromSelectedCoin: null,
    toSelectedCoin: null,
    isSwapClicked: false,
};

const SwapPage: React.FC = () => {
    // const { outToken } = useParams<{ outToken?: string }>();
    const [state, setState] = useSetState<DEFAULT_STATE>(DEFAULT_APP_STATE);
    const { walletIsConnected } = useConnectWalletContext();

    const onToleranceChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ tolerance: Number(e.currentTarget.value || "0") });
    }, [setState]);

    const setToleranceChanged = useCallback((tolerance: number) => {
        setState({ tolerance });
    }, [setState]);

    const setFromCoin = useCallback((selectedCoin: CoinImageType) => {
        setState({ fromSelectedCoin: selectedCoin });
    }, [setState]);

    const setToCoin = useCallback((selectedCoin: CoinImageType) => {
        setState({ toSelectedCoin: selectedCoin });
    }, [setState]);

    const onSwapClicked = useCallback(() => {
        setState({ isSwapClicked: true });
    }, [setState]);

    return (
        <div css={style}>
            <Container css={containerStyle}>
                <div css={mainTitleStyle}>
                    AutoSwap is in public alpha. Use at your own risk.
                </div>
                <Container css={swapBoxContainerStyle}>
                    <Routing
                        toSelectedCoin={state.toSelectedCoin}
                        fromSelectedCoin={state.fromSelectedCoin}
                        css={routingStyle(!!(state.isSwapClicked && state.fromSelectedCoin && state.toSelectedCoin))}
                    />
                    <div css={boxContainerStyle}>
                        <div css={boxStyle}>
                            <div css={innerBoxStyle}>
                                <div css={titleStyle}>Swap</div>
                                <CoinFromToBox
                                    title={"From"}
                                    setCoin={setFromCoin}
                                    selectedCoin={state.fromSelectedCoin}
                                />

                                <div css={arrowBoxContainerStyle}>
                                    <div css={downArrowContainerStyle}>
                                        <ArrowDownIcon css={downArrowStyle} />
                                    </div>
                                </div>

                                <CoinFromToBox title={"To"} setCoin={setToCoin} selectedCoin={state.toSelectedCoin} />

                                <div css={toleranceContainerStyle}>
                                    <div css={toleranceTitleStyle}>Slippage tolerance</div>
                                    <div css={toleranceInputContainerStyle}>
                                        <div
                                            css={toleranceValueStyle(state.tolerance === 0.1)}
                                            onClick={() => setToleranceChanged(0.1)}
                                        >
                                            0.1%
                                        </div>
                                        <div
                                            css={toleranceValueStyle(state.tolerance === 0.5)}
                                            onClick={() => setToleranceChanged(0.5)}
                                        >
                                            0.5%
                                        </div>
                                        <div
                                            css={toleranceValueStyle(state.tolerance === 1)}
                                            onClick={() => setToleranceChanged(1)}
                                        >
                                            1%
                                        </div>
                                        <div css={toleranceInputBoxStyle}>
                                            <input
                                                css={toleranceInputStyle}
                                                type="number"
                                                inputMode="decimal"
                                                placeholder="Custom"
                                                value={state.tolerance.toString()}
                                                onChange={onToleranceChanged}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {walletIsConnected
                                    ? (
                                        <>
                                            <TertiaryButton
                                                fullWidth
                                                css={swapButtonStyle}
                                                onClick={onSwapClicked}
                                            >
                                                Swap
                                            </TertiaryButton>
                                            <div css={swapDetailValueContainerStyle}>
                                                <div css={swapDetailValueStyle}>
                                                    <div>1 BNB</div>
                                                    <div>≈ $527.54</div>
                                                </div>
                                                <div css={swapDetailValueStyle}>
                                                    <div>1 ALICE</div>
                                                    <div>≈ $12.488394</div>
                                                </div>
                                                <div css={swapDetailValueStyle}>
                                                    <div>Swap Rate</div>
                                                    <div>≈ 0 {state.toSelectedCoin?.name}/{state.fromSelectedCoin?.name}</div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                    : (
                                        <div css={walletConnectMessageContainerStyle}>
                                            <div css={walletConnectMessageStyle}>
                                                Wallet not connected
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </Container>
        </div>
    );
};

const style = (theme: Theme) => css`
    border-left: 1px solid ${theme.colours.border};
    margin: 0 auto;
    width: 100%;
    height: 100%;
`;

const containerStyle = css`
    display: flex;
    flex-direction: column;
`;

const mainTitleStyle = css`
    margin: 32px 16px;
    text-align: center;
    font-weight: bold;
    font-size: 17px;
`;

const swapBoxContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 32px 128px;

    ${theme.breakpoints.down("md")} {
        flex-direction: column-reverse;
        align-items: center;
    }

    ${theme.breakpoints.down("sm")} {
        margin-left: 0;
        margin-right: 0;
    }
`;

const animation = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.8;
    }
    100% {
        opacity: 1;
    }
`;

const routingStyle = (isShow: boolean) => (theme: Theme) => css`
    transition: width ${theme.transitions.transition}, overflow ${theme.transitions.transitionSlower}, padding ${theme.transitions.transitionSlower};

    ${isShow
            ? css`
                animation: ${animation} 1s ease-out;
            `
            : css`
                width: 0;
                overflow: hidden;
                padding: 0;
            `
    }
    ${theme.breakpoints.down("md")} {
        margin-top: 32px;
    }
`;

const boxContainerStyle = css`
    min-height: 548px;
`;

const boxStyle = css`
    max-width: 435px;
    min-height: 516px;
`;

const innerBoxStyle = (theme: Theme) => css`
    //min-width: 350px;
    min-width: 250px;
    max-width: calc(100vw - 80px);
    margin: 0 auto;
    height: 100%;
    padding: 32px;
    border-radius: 8px;
    box-shadow: ${theme.borderAndShadow.boxShadow5};
    border: 1px solid ${theme.colours.border};
    background-color: ${theme.colours.box.background};

    ${theme.breakpoints.up("xl")} {
        min-width: 415px;
    }

    ${theme.breakpoints.up("lg")} {
        min-width: 415px;
    }

    @media (min-width: 1024px) and (max-width: 1099.98px) {
        min-width: 350px;
    }

    ${theme.breakpoints.down("md")} {
        min-width: 415px;
    }

`;

const titleStyle = css`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 17px;
`;

const arrowBoxContainerStyle = (theme: Theme) => css`
    height: 30px;
    width: 100%;
    margin: 16px 0;

`;

const downArrowContainerStyle = (theme: Theme) => css`
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #d1d5da;
    margin: 0 auto;
`;

const downArrowStyle = (theme: Theme) => css`
    height: 16px;
    width: 16px;
    color: black;
`;

const toleranceContainerStyle = (theme: Theme) => css`
    height: 60px;
    margin-top: 16px;
`;

const toleranceTitleStyle = (theme: Theme) => css`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
`;

const toleranceInputContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;

    > div:not(:first-of-type) {
        margin-left: 8px;
    }
`;

const toleranceValueStyle = (isActive: boolean) => (theme: Theme) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 17px;
    font-weight: 400;
    cursor: pointer;
    background-color: ${theme.colours.swap.toleranceBackground};

    ${isActive && css`
        background-color: #60a4f9;
    `};

`;

const toleranceInputBoxStyle = (theme: Theme) => css`
    flex: 1 1 auto;
    margin-left: 8px;
    height: 32px;
    border: 1px solid ${theme.colours.border};
    position: relative;
    display: flex;
    border-radius: 4px;
    overflow: hidden;
    background-color: ${theme.colours.swap.coinInputBackground};
`;

const toleranceInputStyle = (theme: Theme) => css`
    width: 100%;
    padding: 4px 8px;
    height: 32px;
    border: 0;
    font-size: 17px;
    font-weight: 400;
    background-color: ${theme.colours.swap.toleranceBackground};
    color: ${theme.colours.text};

    ${theme.mixins.placeholder(`
        color: ${theme.colours.swap.blackGrayText};
    `)};

    :active,
    :focus {
        outline: unset;
    }
`;

const walletConnectMessageContainerStyle = (theme: Theme) => css`
    margin-top: 16px;
    padding: 16px 0;
    border-radius: 4px;
    background-color: ${theme.colours.swap.coinInputBackground};
`;

const walletConnectMessageStyle = (theme: Theme) => css`
    height: 24px;
    font-weight: 400;
    font-size: 17px;
    text-align: center;
    color: ${theme.colours.swap.blackGrayText};
`;

const swapButtonStyle = (theme: Theme) => css`
    margin-top: 32px;
    height: 48px;
    padding: 16px 8px;
    font-weight: 700;
    font-size: 17px;
    text-align: center;
`;

const swapDetailValueContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    color: ${theme.colours.grayGrayText};
    font-weight: 500;

    > :not(:first-of-type) {
        margin-top: 4px;
    }
`;

const swapDetailValueStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export default SwapPage;