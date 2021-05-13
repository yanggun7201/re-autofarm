import React, { useCallback } from 'react';
import { css } from "@emotion/react";
import { ReactComponent as ChevronDownIcon } from "../../../images/chevron-down-icon.svg";
import { Theme } from "../../../theme";
import SelectCoinModal from "../../../components/modals/SelectCoinModal";
import useSetState from "../../../core/hooks/useSetState";
import { CoinImageType } from "../../../data/CoinImageData";

type Props = {
    title: string,
    selectedCoin?: CoinImageType | null,
    setCoin: (selectedCoin: CoinImageType) => void,
};

type DEFAULT_STATE = {
    openSelectCoinModal: boolean,
};

const DEFAULT_APP_STATE = {
    openSelectCoinModal: false,
};

const CoinFromToBox: React.FC<Props> = ({
                                            title = "",
                                            selectedCoin,
                                            setCoin,
                                        }) => {
    const [state, setState] = useSetState<DEFAULT_STATE>(DEFAULT_APP_STATE);

    const onOpenCoinModal = useCallback((e: React.MouseEvent) => {
        setState({ openSelectCoinModal: true });
    }, [setState]);

    const onCloseCoinModal = useCallback(() => {
        setState({ openSelectCoinModal: false });
    }, [setState]);

    const onChooseCoin = useCallback((selectedCoin: CoinImageType) => {
        setCoin(selectedCoin);
        onCloseCoinModal();
    }, [setCoin, onCloseCoinModal]);

    return (
        <div css={fromToBoxContainerStyle}>
            <div css={fromToBoxStyle}>
                <div css={fromToTitleBoxStyle}>
                    <div css={fromToTitleStyle}>{title}</div>
                    <div css={fromToSubTitleStyle}>
                        Balance:
                        <span className="font-mono"></span>
                    </div>
                </div>
                <div css={coinInputSelectBoxContainerStyle}>
                    <input type="number" css={coinInputSelectBoxInputStyle} />
                    <div css={coinInputSelectBoxCoinBoxStyle} onClick={onOpenCoinModal}>
                        {selectedCoin
                            ? (
                                <>
                                    <img
                                        src={selectedCoin.imagePath}
                                        alt={selectedCoin.name}
                                        css={coinIconStyle}
                                    />
                                    <span css={coinNameStyle}>{selectedCoin.name}</span>
                                </>
                            )
                            : (
                                <span css={coinNamePlaceholderStyle}>Select token</span>
                            )
                        }
                        <ChevronDownIcon css={chevronStyle} />
                    </div>
                </div>
                <div css={spaceStyle}>≈ $0.00(-0%)</div>
            </div>

            {state.openSelectCoinModal && (
                <SelectCoinModal onChooseCoin={onChooseCoin} onClose={onCloseCoinModal} />
            )}
        </div>
    );
};

const fromToBoxContainerStyle = css`
    width: 100%;
    height: 98px;

    .pure-modal {
        margin: 0 !important;
        padding: 0 !important;
        border-radius: 24px;
        overflow: hidden;

        max-height: calc(100% - 120px);

        .panel-body {
            margin: 0 !important;
            padding: 0 !important;
        }
    }
`;

const fromToBoxStyle = css`
    display: flex;
    flex-direction: column;
`;

const fromToTitleBoxStyle = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 4px;
`;

const fromToTitleStyle = (theme: Theme) => css`
    font-size: 14px;
    font-weight: bold;
    color: ${theme.colours.text};
`;

const fromToSubTitleStyle = (theme: Theme) => css`
    font-size: 14px;
    font-weight: 400;
    color: ${theme.colours.swap.subTitle};
`;

const coinInputSelectBoxContainerStyle = (theme: Theme) => css`
    height: 50px;
    border: 1px solid ${theme.colours.border};
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    overflow: hidden;
    padding-right: 12px;
    background-color: ${theme.colours.swap.coinInputBackground};
`;

const coinInputSelectBoxInputStyle = (theme: Theme) => css`
    height: 48px;
    padding: 12px 0 12px 12px;
    max-width: 257px;
    flex-grow: 1;
    width: 100px;
    font-size: 17px;
    font-weight: 400;
    border: 0;
    background-color: ${theme.colours.swap.coinInputBackground};
    color: ${theme.colours.text};

    :active,
    :focus {
        outline: unset;
    }
`;

const coinInputSelectBoxCoinBoxStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 12px;
    height: 100%;
    cursor: pointer;
`;

const coinIconStyle = (theme: Theme) => css`
    width: 20px;
    height: 20px;
`;

const coinNameStyle = (theme: Theme) => css`
    font-size: 16px;
    font-weight: bold;
    margin: 0 5px;
    color: ${theme.colours.swap.coinName};
`;

const coinNamePlaceholderStyle = (theme: Theme) => css`
    font-size: 16px;
    font-weight: 400;
    margin: 0 5px;
    color: ${theme.colours.swap.blackGrayText};
    width: max-content;
`;

const chevronStyle = (theme: Theme) => css`
    width: 16px;
    height: 16px;
    margin-left: 2px;
    margin-right: 2px;
    fill: ${theme.colours.text};
`;

const spaceStyle = (theme: Theme) => css`
    height: 20px;
    color: #6a7380;
    font-size: 15px;
    font-weight: 400;
    text-align: right;
    margin-top: 4px;
`;

export default CoinFromToBox;