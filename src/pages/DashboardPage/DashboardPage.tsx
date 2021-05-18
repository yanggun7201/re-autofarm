import React, { useCallback } from 'react';
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import useSetState from "../../core/hooks/useSetState";
import CommonLink from "../../components/links/CommonLink";
import TertiaryButton from "../../components/buttons/TertiaryButton";
import { useConnectWalletContext } from "../../core/contexts/ConnectWalletContext";
import { ReactComponent as CautionIcon } from "../../images/caution-icon.svg";

type DEFAULT_STATE = {
    noHoldings: boolean,
};

const DEFAULT_APP_STATE = {
    noHoldings: false,
};

const DashboardPage: React.FC = () => {
    const [state, setState] = useSetState<DEFAULT_STATE>(DEFAULT_APP_STATE);
    const { walletIsConnected } = useConnectWalletContext();

    const onStartTrackingClicked = useCallback((): Promise<void> => {
        console.log("Start tracking 버튼 클릭");
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setState({ noHoldings: true });
                reject();
            }, 3000);
        });
    }, [setState]);

    return (
        <div css={style}>
            {walletIsConnected
                ? (
                    <div css={welcomeMainContainerStyle}>
                        <h1 css={welcomeMainTextStyle}>Welcome to your new dashboard</h1>
                        <p css={paragraphStyle}>
                            Hey, seems like you are new here!
                            <br />
                            This is a service we are providing for free to all $AUTO holders via&nbsp;
                            <CommonLink href={"https://www.farmfol.io"} css={underlineStyle}>ƒarmƒol.io</CommonLink>
                            <br />
                            It allows you to track the performance over time of your assets staked on autofarm.
                            <br />
                            When you stop using autofarm to stake your assets you will lose access to your dashboard.
                        </p>
                        <div css={trackingButtonContainerStyle}>
                            <TertiaryButton onClick={onStartTrackingClicked}>
                                Start tracking
                            </TertiaryButton>
                        </div>
                        {state.noHoldings && (
                            <div css={noHoldingsContainerStyle}>
                                <CautionIcon css={cautionIconStyle} />
                                <span className="inline-block mr-8 align-middle">
                                <pre className="text-sm">NO_AUTOFARM_HOLDINGS</pre>
                            </span>
                            </div>
                        )}
                    </div>
                )
                : (
                    <div css={mainTitleStyle}>
                        Please connect your wallet...
                    </div>
                )
            }
        </div>
    );
};

const style = (theme: Theme) => css`
    border-left: 1px solid ${theme.colours.border};
    margin: 0 auto;
    width: 100%;
    height: 100%;
`;

const mainTitleStyle = css`
    margin: 80px auto;
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    max-width: calc(100vw - 80px);
`;

const welcomeMainContainerStyle = css`
    margin: 100px auto;
    padding: 0 12px;
`;

const welcomeMainTextStyle = css`
    font-weight: bold;
    font-size: 24px;
`;

const paragraphStyle = css`
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
`;

const underlineStyle = (theme: Theme) => css`
    text-decoration: underline;
    text-underline-color: ${theme.colours.text};
    color: ${theme.colours.text};

    :active,
    :visited {
        color: ${theme.colours.text};
    }
`;

const trackingButtonContainerStyle = (theme: Theme) => css`
    margin-top: 16px;
`;

const noHoldingsContainerStyle = (theme: Theme) => css`
    width: 330px;
    height: 56px;
    margin: 16px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 24px;
    border-radius: 4px;
    background-color: ${theme.colours.red};
    color: ${theme.colours.white};
    font-size: 15px;
    font-weight: 400;
    max-width: 90%;
`;

const cautionIconStyle = (theme: Theme) => css`
    width: 20px;
    height: 20px;
    margin-right: 20px;
`;

export default DashboardPage;