import React from 'react';
import { useParams } from "react-router";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import { ReactComponent as ChevronDownIcon } from "../../images/chevron-down-icon.svg";
import { ReactComponent as ArrowDownIcon } from "../../images/arrow-down-icon.svg";

const SwapPage: React.FC = () => {
    const { outToken } = useParams<{ outToken?: string }>();
    console.log('outToken', outToken);

    return (
        <div css={style}>
            <div css={mainTitleStyle}>
                AutoSwap is in public alpha. Use at your
                own risk.
            </div>
            <div css={boxContainerStyle}>
                <div css={boxStyle}>
                    <div css={innerBoxStyle}>
                        <div css={titleStyle}>Swap</div>
                        <div css={fromToBoxContainerStyle}>
                            <div css={fromToBoxStyle}>
                                <div css={fromToTitleBoxStyle}>
                                    <div css={fromToTitleStyle}>From</div>
                                    <div css={fromToSubTitleStyle}>
                                        Balance:
                                        <span className="font-mono"></span>
                                    </div>
                                </div>
                                <div
                                    css={coinInputSelectBoxContainerStyle}>
                                    <input type="number" css={coinInputSelectBoxInputStyle} value="" />
                                    <div css={coinInputSelectBoxCoinBoxStyle}>
                                        <img
                                            src="https://exchange.pancakeswap.finance/images/coins/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png"
                                            css={coinIconStyle}
                                        />
                                        <span css={coinNameStyle}>BNB</span>
                                        <ChevronDownIcon css={chevronStyle}/>
                                    </div>
                                </div>
                                <div css={spaceStyle}>&nbsp;</div>
                            </div>
                        </div>

                        <div css={arrowBoxContainerStyle}>
                            <div css={downArrowContainerStyle}>
                                <ArrowDownIcon css={downArrowStyle}/>
                            </div>
                        </div>








                        <div className="flex flex-col space-y-1">
                            <div>Slippage tolerance</div>
                            <div className="flex space-x-2">
                                <div
                                    className="p-1 px-2 text-center rounded cursor-pointer bg-gray-200 dark:bg-gray-800">0.1%
                                </div>
                                <div
                                    className="p-1 px-2 text-center rounded cursor-pointer bg-gray-200 dark:bg-gray-800">0.5%
                                </div>
                                <div
                                    className="p-1 px-2 text-center rounded cursor-pointer bg-blue-400 dark:bg-blue-500">1%
                                </div>
                                <div className="flex-auto"><input
                                    className="bg-gray-200 dark:bg-gray-800 rounded p-1 px-2 w-full focus:outline-none"
                                    type="number" placeholder="Custom" value="" /></div>
                            </div>
                        </div>
                        <div className="pt-4">
                            <div className="text-center dark:text-gray-400 rounded-lg p-3 dark:bg-gray-800">Wallet not
                                connected
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-auto transition-all transform duration-500"></div>
            </div>
        </div>
    );
};

const style = css`
`;

const mainTitleStyle = css`
    height: 88px;
    margin: 32px 16px;
`;

const boxContainerStyle = css`
    height: 548px;
`;

const boxStyle = css`
    width: 435px;
    height: 516px;
`;

const innerBoxStyle = (theme: Theme) => css`
    width: 435px;
    height: 516px;
    padding: 32px;
    border: 1px solid ${theme.colours.border};
`;

const titleStyle = css`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
`;

const fromToBoxContainerStyle = css`
    width: 100%;
    height: 98px;
`;

const fromToBoxStyle = css`
    display: flex;
    flex-direction: column;
`;

const fromToTitleBoxStyle = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const fromToTitleStyle = css`
    font-size: 14px;
    font-weight: bold;
`;

const fromToSubTitleStyle = css`
    font-size: 14px;
    font-weight: 400;
`;

const coinInputSelectBoxContainerStyle = (theme: Theme) => css`
    height: 50px;
    border: 1px solid ${theme.colours.border};
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const coinInputSelectBoxInputStyle = (theme: Theme) => css`
    height: 48px;
    padding: 12px 0 12px 12px;
    width: 257px;
`;

const coinInputSelectBoxCoinBoxStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const coinIconStyle = (theme: Theme) => css`
    width: 20px;
    height: 20px;
`;

const coinNameStyle = (theme: Theme) => css`
    font-size: 16px;
    font-weight: 600;
    color: #e3e7ea;
`;

const chevronStyle = (theme: Theme) => css`
    width: 12px;
    height: 12px;
    margin-left: 4px;
    margin-right: 4px;
`;

const spaceStyle = (theme: Theme) => css`
    height: 20px;
`;

const arrowBoxContainerStyle = (theme: Theme) => css`
    height: 30px;
    width: 100%;
    margin-bottom: 16px;
`;

const downArrowContainerStyle = (theme: Theme) => css`
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #d1d5da;
`;

const downArrowStyle = (theme: Theme) => css`
    height: 16px;
    width: 16px;
    color: black;
`;

export default SwapPage;