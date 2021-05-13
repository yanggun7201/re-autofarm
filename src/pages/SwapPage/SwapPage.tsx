import React, { useCallback } from 'react';
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import { ReactComponent as ArrowDownIcon } from "../../images/arrow-down-icon.svg";
import CoinFromToBox from "./components/CoinFromToBox";
import useSetState from "../../core/hooks/useSetState";
import { CoinImageType } from "../../data/CoinImageData";
import { useConnectWalletContext } from "../../core/contexts/ConnectWalletContext";
import TertiaryButton from "../../components/buttons/TertiaryButton";

type DEFAULT_STATE = {
    tolerance: number | string,
    fromSelectedCoin?: CoinImageType | null,
    toSelectedCoin?: CoinImageType | null,
};

const DEFAULT_APP_STATE = {
    tolerance: "",
    fromSelectedCoin: null,
    toSelectedCoin: null,
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
        alert("Swap 버튼이 클릭되었습니다.");
    }, []);

    return (
        <div css={style}>
            <div css={mainTitleStyle}>
                AutoSwap is in public alpha. Use at your own risk.
            </div>
            <div css={boxContainerStyle}>
                <div css={boxStyle}>
                    <div css={innerBoxStyle}>
                        <div css={titleStyle}>Swap</div>
                        <CoinFromToBox title={"From"} setCoin={setFromCoin} selectedCoin={state.fromSelectedCoin} />

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
                                <TertiaryButton
                                    fullWidth
                                    css={swapButtonStyle}
                                    onClick={onSwapClicked}
                                >
                                    Swap
                                </TertiaryButton>
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
                <div className="w-full sm:w-auto transition-all transform duration-500"></div>
            </div>
        </div>
    );
};

const style = css`
    margin: 0 auto;
`;

const mainTitleStyle = css`
    margin: 32px 16px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    max-width: calc(100vw - 80px);
`;

const boxContainerStyle = css`
    height: 548px;
`;

const boxStyle = css`
    max-width: 435px;
    height: 516px;
`;

const innerBoxStyle = (theme: Theme) => css`
    width: 435px;
    max-width: calc(100vw - 80px);
    margin: 0 auto;
    height: 516px;
    padding: 32px;
    border-radius: 8px;
    box-shadow: ${theme.borderAndShadow.boxShadow5};
    border: 1px solid ${theme.colours.border};
    background-color: ${theme.colours.box.background};
`;

const titleStyle = css`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
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

export default SwapPage;