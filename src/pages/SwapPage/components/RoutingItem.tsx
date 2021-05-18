import React, { memo } from 'react';
import { css } from "@emotion/react";
import { CoinImageType } from "../../../data/CoinImageData";
import { Theme } from "../../../theme";
import { ReactComponent as ChevronRightIcon } from "../../../images/chevron-right-icon.svg";

type Props = {
    coin?: CoinImageType | null,
};

const RoutingItem: React.FC<Props> = ({
    coin,
}) => (
    <div css={routingItemStyle}>
        <div css={routingLeftBoxStyle}>
            <span css={percentStyle}>100%</span>
            <ChevronRightIcon />
        </div>

        <div css={routingRightBoxStyle}>
            <div css={routingBoxTitleContainerStyle}>
                <img src={coin?.imagePath} alt={coin?.name} css={coinImageStyle} />
                <div>{coin?.name}</div>
            </div>

            <div css={routingValuesContainerStyle}>
                <div css={routingValueContainerStyle}>
                    <div>PCSv2</div>
                    <div>100%</div>
                </div>
                <div css={routingValueContainerStyle}>
                    <div>PancakeSwap</div>
                    <div>5%</div>
                </div>
                <div css={routingValueContainerStyle}>
                    <div>ApeSwap</div>
                    <div>2.5%</div>
                </div>
            </div>
        </div>
    </div>
);

const routingItemStyle = css`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    min-width: 154px;
`;

const routingLeftBoxStyle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const routingRightBoxStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: 8px;
    margin-bottom: 16px;
    box-shadow: ${theme.borderAndShadow.boxShadow5};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`;

const routingBoxTitleContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;
    padding: 8px;
    background-color: ${theme.colours.routing.headerBackground};
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    overflow: hidden;
    align-items: center;
    font-size: 17px;
    font-weight: 500;

    img {
        margin-right: 8px;
    }
`;

const coinImageStyle = css`
    height: 20px;
    width: 20px;
`;

const routingValuesContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: column;
    padding: 4px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: hidden;
    border: 0;
    background-color: ${theme.colours.routing.bodyBackground};
`;

const routingValueContainerStyle = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 24px;
    align-items: center;
    font-size: 17px;
    font-weight: 500;
    margin: 4px;
`;

const percentStyle = css`
    font-weight: bold;
    font-size: 17px;
    padding-top: 3px;
`;

export default memo(RoutingItem);