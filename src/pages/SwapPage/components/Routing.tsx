import React, { memo } from 'react';
import { css } from "@emotion/react";
import { CoinImageType } from "../../../data/CoinImageData";
import { Theme } from "../../../theme";
import RoutingItem from "./RoutingItem";
import RoutingItemContainer from "./RoutingItemContainer";

type Props = {
    fromSelectedCoin?: CoinImageType | null,
    toSelectedCoin?: CoinImageType | null,
    className?: string,
};

const Routing: React.FC<Props> = ({
    fromSelectedCoin,
    toSelectedCoin,
    className,
}) => {
    return (
        <div css={style} className={className}>
            <div css={routingTitleStyle}>Routing</div>
            <div css={routingBodyContainerStyle}>
                <div css={routingBoxContainerStyle}>
                    <img src={fromSelectedCoin?.imagePath} alt={fromSelectedCoin?.name} css={coinImageStyle} />
                    <div css={routingBoxStyle}>
                        <RoutingItemContainer>
                            <RoutingItem coin={toSelectedCoin} />
                        </RoutingItemContainer>
                        <RoutingItemContainer>
                            <RoutingItem coin={toSelectedCoin} />
                            <RoutingItem coin={toSelectedCoin} />
                        </RoutingItemContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const style = (theme: Theme) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 0 32px 0 16px;

    ${theme.breakpoints.down("sm")} {
        padding: 0;
    }
`;

const routingTitleStyle = (theme: Theme) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 31px;
    font-weight: 700;
    margin-bottom: 16px;

    ${theme.breakpoints.down("md")} {
        font-size: 25px;
    }
`;

const routingBodyContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

    ${theme.breakpoints.down("xs")} {
        margin: 0;
    }
`;

const routingBoxContainerStyle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    width: 100%;
`;

const routingBoxStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 500px;
    width: max-content;

    ${theme.breakpoints.down("md")} {
        min-width: unset;
    }

    ${theme.breakpoints.down("xs")} {
        min-width: unset;
        width: calc(100vw - 75px);
    }
`;

const coinImageStyle = css`
    height: 32px;
    width: 32px;
`;

export default memo(Routing);