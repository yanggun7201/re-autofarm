import React, { useCallback } from "react";
import { css } from "@emotion/react";
import PureModal from 'react-pure-modal';
import { trim } from "lodash";
import { Theme } from "../../theme";
import useSetState from "../../core/hooks/useSetState";
import coinImages, { CoinImageType } from "../../data/CoinImageData";

type Props = {
    className?: string,
    onChooseCoin: (selectedCoin: CoinImageType) => void,
    onClose: () => void,
};

type DEFAULT_STATE = {
    searchText: string,
};

const DEFAULT_APP_STATE = {
    searchText: "",
};

const SelectCoinModal: React.FC<Props> = ({
    className = "",
    onChooseCoin,
    onClose
}) => {
    const [state, setState] = useSetState<DEFAULT_STATE>(DEFAULT_APP_STATE);

    const onSearchTextChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ searchText: trim(e.currentTarget.value) });
    }, [setState]);

    const onRequestClose = useCallback(() => {
        onClose();
    }, [onClose]);

    return (
        <PureModal
            isOpen
            onClose={onRequestClose}
            css={style}
            className={className}
        >
            <div css={style}>
                <div css={titleStyle}>Select Token</div>
                <input
                    css={inputStyle}
                    placeholder="Search"
                    value={state.searchText}
                    onChange={onSearchTextChanged}
                />
                <div css={coinListStyle}>
                    {coinImages
                        .filter((coin: CoinImageType) => coin.name.toLowerCase().search(state.searchText.toLowerCase()) > -1)
                        .map((coin: CoinImageType) => (
                            <div
                                key={coin.name}
                                css={coinItemStyle}
                                onClick={() => onChooseCoin(coin)}
                            >
                                <img src={coin.imagePath} alt={coin.name} css={coinImageStyle} />
                                <div css={coinNameStyle}>{coin.name}</div>
                            </div>
                        ))}
                </div>
            </div>
        </PureModal>
    );
}

const style = (theme: Theme) => css`
    margin: 0;
    padding: 32px;
    padding-bottom: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${theme.colours.selectToken.background};

    ${theme.breakpoints.up("md")} {
        min-width: 384px !important;
        max-width: 384px !important;
    }

    ${theme.breakpoints.down("sm")} {
        min-width: 416px !important;
        max-width: 416px !important;
        height: calc(100vh - 48px);
    }

    ${theme.breakpoints.down("xs")} {
        min-width: 100%;
        max-width: calc(100% - 50px) !important;
    }

    .close {
        display: none;
    }

    .panel {
        .panel-body {
            overflow: hidden;
            border-radius: 12px;
            padding: 0;
            margin: 0;
        }
    }
`;

const titleStyle = (theme: Theme) => css`
    width: 100%;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 12px;
    color: ${theme.colours.title};
`;

const inputStyle = (theme: Theme) => css`
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 8px;
    margin-top: 16px;
    font-size: 17px;
    font-weight: 400;
    border: 0;
    margin-bottom: 16px;
    border-radius: 4px;
    color: ${theme.colours.connectWallet.title};
    background-color: ${theme.colours.selectToken.hover};
`;

const coinListStyle = (theme: Theme) => css`
    overflow-y: scroll;
    width: calc(100% + 64px);
    max-height: calc(100vh - 270px);
    margin: 0 -32px;
    flex: 1 1 auto;
    background-color: ${theme.colours.selectToken.background};
`;

const coinItemStyle = (theme: Theme) => css`
    height: 48px;
    width: 100%;
    padding: 12px 16px 12px 32px;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: ${theme.colours.selectToken.background};
    transition: background-color ${theme.transitions.transitions};

    :hover {
        background-color: ${theme.colours.selectToken.hover};
    }
`;

const coinImageStyle = (theme: Theme) => css`
    height: 24px;
    width: 24px;
`;

const coinNameStyle = (theme: Theme) => css`
    flex: 1 1 auto;
    margin-left: 16px;
    font-size: 17px;
    font-weight: 400;
`;

export default SelectCoinModal;

